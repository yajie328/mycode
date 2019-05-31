let http = require('http');

// http.get http.request  响应体
// 通过服务的发请求
let client = http.request({
    hostname:'localhost',
    port: 3000,
    path: '/xxx?b=1&c=4',
    method: 'post',
    headers:{
        a: 1,
        // 'content-type': 'application/json',
        'content-Type':'application/x-www-form-urlencoded'
    }
},(response)=>{
    response.on('data', (data)=>{
        console.log(JSON.parse(data));
    })
});

client.end('name=daya&a=1')


1） 爬虫
2）中间层
