let http = require('http');
let querystring = require('querystring');
// curl -v baidu.com 
// curl -X POST -d "username=123&password=345" http://localhost:3001
// 请求分为三部分 1) 请求行 方法 路径 协议
             //  2) 请求头 浏览器信息 + 自定义
            //  3) 请求体
// request 可读流 response可写流
// 请求体需要on('data')来接受数据
// 响应也分为三部分：
// 1）响应行 常见状态吗 200 204 206 范围请求
// 301 永久重定向 302 临时重定向 304 缓存
// 400 没权限 403 无法访问 404
// 500 服务端挂了
// 2)响应头  headers
// 3)响应体
// createClient 爬虫
let server = http.createServer((request, response)=>{
    console.log(request.url);   // 端口号后面的部分 但是没有hash
    console.log(request.method); // method方法名是大写的
    // console.log(request.httpVersion); //
    // console.log(request.headers);  //{} 属性名都是小写的
   

    // 请求的post方法
    let arr = [];
    request.on('data', function(data){
        arr.push(data);
    })
    request.on('end', function(){ // 不管有没有请求体 都会触发end事件
        let str = Buffer.concat(arr).toString();
        // username=123&password=345
        // let obj = {};
        // str.replace(/([^=&]*)=([^=&]*)/g, function(){
        //     obj[arguments[1]] = arguments[2];
        // });
        // querysting  用法 json.parse json.stringify
        let obj = querystring.parse(str,'&','=');
        response.statusCode = 404; 
        response.setHeader('a',1); // 设置响应头
        response.end(JSON.stringify(obj).toString());
        // response.end('hello daya aaa');
    })
    
    // response相应的内容
})
server.listen(3000,'localhost',()=>{
    console.log('3000 start');
});

// nodemon 监控器 只要文件发生变化 就会重启
// npm install -g nodemon
// nodemon http.js 


