let http =  require('http');
let querystring = require("querystring");
let url = require('url');
// let fs = require('fs');
let path = require('path');
let mime = require('mime'); // 第三方模块
let fs = require('mz/fs');

class Server{
   async handleRequest(req,res){
        let {pathname} = url.parse(req.url,true);
        let absPath = path.join(__dirname, pathname);
        // 先判断是否调用接口 /user get post /delete put
        let method = req.method.toLowerCase();

        // 允许跨域
        res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5500');
        // 允许的请求方法
        res.setHeader('Access-Control-Allow-Methods', 'GET, PUT,POST, OPTIONS,DELETE');
        // 允许的跨域头
        res.setHeader("Access-Control-Allow-Headers", 'Content-Type, token')
        // ptions的发送间隔
        res.setHeader('Access-Control-Max-age', 10);
        // 允许前端访问 携带cookie
        res.setHeader('Access-Control-Allow-Credentials', true);
        
        if(method === 'options'){ // options不进行处理
            res.end(); // 可以访问我
        }
        console.log(req.headers);
        switch(pathname){
            case '/userList':
                if(method === 'get'){
                    res.setHeader('Content-Type', 'application/json'); // 返回json格式
                    res.end(JSON.stringify({name:'daya'}));
                }
                if(method === 'put'){
                    res.setHeader('Content-Type', 'application/json'); // 返回json格式
                    res.end(JSON.stringify({name:'daya'}));
                }
            return;
        }
        try{
            let statObj = await fs.stat(absPath);
            if(statObj.isDirectory()){
                let realPath = path.join(absPath, 'index.html');
                console.log(realPath);
                await fs.access(realPath);
                this.sendFile(realPath, res);
            }else{
                this.sendFile(absPath, res);
            }
        }catch(e){
            this.sendError(res,e);
        }
    }
    start(port){
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(port);

    }
    sendError(res,err){
        res.statusCode = 404;
        res.end('Not Fount');
    }
    sendFile(path,res){
        res.setHeader('Content-type', mime.getType(path)+';charset=utf-8');
        fs.createReadStream(path).pipe(res);
    }
}

let server = new Server();
server.start(3000);

// let server = http.createServer((req,res)=>{
//     let {pathname} = url.parse(req.url,true);
//     let absPath = path.join(__dirname, pathname);
//    fs.stat(absPath,(err, statObj)=>{
//        if(err){
//            res.statusCode = 404;
//            res.end('Not Fount');
//            return;
//        }
//        if(statObj.isFile()){
//            // 1.css => text/css 1.png =>img/png
//            res.setHeader('Content-type', mime.getType(absPath)+';charset=utf-8');
//            fs.createReadStream(absPath).pipe(res);
//        }else{
//            // 如果是文件夹 就取文件夹下找index.html
//            let realPath = path.join(absPath,'index.html');
//            fs.access(realPath,(err)=>{
//                if(err){
//                    res.statusCode = 404;
//                    res.end('Not Fount');
//                    return;
//                }
//                res.setHeader('Content-type','text/html; chart=utf-8')
//                fs.createReadStream(realPath).pipe(res);
//            })
//            console.log('访问的是:',realPath)
//        }
//    })
// });
// server.listen(3000); 