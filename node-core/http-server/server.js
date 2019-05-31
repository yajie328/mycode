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
    catch(req, res, statObj){
        // 服务器要写给客户端 加3个头
        let lastModified = statObj.ctime.toUTCString();
        let modifiedSince = req.headers['if-modified-since'];
        let etag = statObj.size+'';
        let noneMatch = req.headers['if-none-match'];

        res.setHeader('Cache-Control','max-age=5');
        res.setHeader('Last-Modified', lastModified);
        res.setHeader('Etag', etag);
        

        if(lastModified !== modifiedSince){
            return false;
        }
        if(noneMatch !== etag){
            return false;
        }
        return  true;


    }
    sendFile(req,res,statObj,absPath){
        if(this.catch(req, res, statObj)){
            res.statusCode = 304;
            res.end();
            return;
        }
        res.setHeader("Content-type",mime.getType(absPath)+";charset=utf-8")
        fs.createReadStream(absPath).pipe(res);
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