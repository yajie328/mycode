let http = require('http');
let path = require('path')
let url = require('url');

let mime = require('mime'); // 解析类型
let ejs = require('ejs');  // 用数据和模板 组成一个页面
let fs = require("mz/fs"); // promise
let chalk = require("chalk"); // 命令行添加颜色
let crypto = require('crypto'); // 加密
let template = fs.readFileSync(path.resolve(__dirname,"template.html"),"utf8")
class Server{
    constructor(config){
        this.host = config.host;
        this.dir = config.dir;
        this.port = config.port;
        this.template = template;
    }
   async handleRequest(req,res){
       try{
           let {pathname} = url.parse(req.url);
           let absPath =  path.join(this.dir, pathname);
           let statObj = await fs.stat(absPath); 
           if(statObj.isDirectory()){
                // 如果是目录直接展示给用户
                let dirs = await fs.readdir(absPath);

                let str = ejs.render(this.template,{arr: dirs.map((dir)=>({
                    href: path.join(pathname, dir), 
                    content: dir
                }) )});
                res.setHeader('Content-type', 'text/html;charset=utf-8');
                res.end(str);
            }else{
                this.sendFile(req,res,statObj,absPath);
            }
            
        }catch(e){
            this.sendError(e,req,res);
        }
    }
    sendError(err,req,res){
        console.log(err);
        res.statusCode = 404;
        res.end("Not Found");
    }
    sendFile(req,res,statObj,absPath){
        // 增加缓存 服务的 设置缓存 有两种方式 
        // 1）强制缓存 
        // res.setHeader('Cache-Control','max-age=10');
        // res.setHeader('Expires', new Date(new Date()+10*1000).toUTCString())
        // 2.1 对比缓存 304 比较一下是否变化 
        // Last-Modified
        // res.setHeader('Last-Modified',statObj.ctime.toUTCString())
        // 不太靠谱 可能时间变了 但是内容没变
    /*     let client = req.headers['if-modified-since']; // 取值都是小写
        let server = statObj.ctime.toUTCString();
        if(client === server){ // 服务端发给客户端的文件没有更新 可以使用缓存
            res.statusCode = 304;
            res.end();
            return;
        } */

        res.setHeader('Cache-Control', 'no-cache');
        console.log(req.url);
        res.setHeader("Content-type",mime.getType(absPath)+";charset=utf-8")
        // fs.createReadStream(absPath).pipe(res);
        
        // 2）2.对比缓存 协商缓存 last-modified if-modified-since eTag  if-nooe-match
        let md5 = crypto.createHash('md5');
        let rs = fs.createReadStream(absPath);
        let arr = [];
        rs.on('data', function(chunk){
            md5.update(chunk);
            arr.push(chunk);
        });
        rs.on('end', function(){
            let server = md5.digest('base64');
            let client = req.headers['If-None-Match'];
            if(server === client){
                res.statusCode = 304;
                res.end();
                return;
            }
            res.setHeader('ETag', server);
            res.end(Buffer.concat(arr));
        });
    }
    start(){
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(this.port, this.port,()=>{
            console.log(chalk.green(`Starting up http-server, serving ${this.dir} Available on \r\n`));
            console.log(chalk.yellow(`http://${this.host}:${this.port}`))
        });
    }
}

module.exports = Server;