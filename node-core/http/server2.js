let http =  require('http');
let querystring = require("querystring");
let url = require('url');
let fs = require('fs');
let path = require('path');
let mime = require('mime'); // 第三方模块

// 路由 根据不同路径返回不同内容
// fs.accsss fs.stat statobj.isFile/isDirectory
// fs.stat(path.resolve(__dirname, 'a'), function(err, statObj){
//     console.log(err);
//     console.log(statObj.isFile());
//     console.log(statObj.isDirectory());
// })

let obj = {
    '.js': 'application/js'
}
let server = http.createServer((req,res)=>{
    let {pathname} = url.parse(req.url,true);
    let absPath = path.join(__dirname, pathname);
   fs.stat(absPath,(err, statObj)=>{
       if(err){
           res.statusCode = 404;
           res.end('Not Fount');
           return;
       }
       if(statObj.isFile()){
           // 1.css => text/css 1.png =>img/png
           res.setHeader('Content-type', mime.getType(absPath)+';charset=utf-8');
           fs.createReadStream(absPath).pipe(res);
       }else{
           // 如果是文件夹 就取文件夹下找index.html
           let realPath = path.join(absPath,'index.html');
           fs.access(realPath,(err)=>{
               if(err){
                   res.statusCode = 404;
                   res.end('Not Fount');
                   return;
               }
               res.setHeader('Content-type','text/html; chart=utf-8')
               fs.createReadStream(realPath).pipe(res);
           })
           console.log('访问的是:',realPath)
       }
   })
});
server.listen(3000); 