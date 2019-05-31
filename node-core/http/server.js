let http =  require('http');
let querystring = require("querystring");
let url = require('url');

// console.log(url.parse("http://www.baidu.com:3000/xxx/a/b? a=2 &b=2"));

let server = http.createServer((req,res)=>{
    // req.url/ header / method / req.on('data')
    // res.write end setHeader
    let {pathname, query} = url.parse(req.url);
    console.log(pathname, query);

    let method = req.method.toLowerCase();
    console.log(method);

    let headers = req.headers;
    console.log(headers);

    let arr = [];
    req.on('data',function(chunk){
        arr.push(chunk);   
    })
    req.on('end', function(){
        let str = Buffer.concat(arr).toString();

        if(req.headers['content-type'] === 'application/x-www-form-urlencoded'){
            let obj = querystring.parse(str);
            res.setHeader('Content-type', 'application/json;charset=utf8');
            res.end(JSON.stringify(obj));
        }
    })
});
server.listen(3000); 