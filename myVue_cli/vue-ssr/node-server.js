let path = require('path');
let express = require('express');
let app = express();
let Vue = require('vue');
let fs = require('fs');
// vue提供的服务端渲染的包
const VueServerRenderer = require('vue-server-renderer')

// let serverBundle = fs.readFileSync('./dist/server.bundle.js','utf8');
let serverBundle = require('./dist/vue-ssr-server-bundle.json');
let clientManifest = require('./dist/vue-ssr-client-manifest.json');
let template = fs.readFileSync('./dist/index.ssr.html','utf8')

let renderer = VueServerRenderer.createBundleRenderer(serverBundle,{
    template,
    clientManifest // 重新打包客户端和服务端node就不需要重启了
}); 

app.get('/', (req,res)=>{
    // 把渲染的字符串扔给客户端并  只是返回字符串，没有vue的实际功能
    
    let context = {url: req.url};
    renderer.renderToString(context, (err, html)=>{
        res.send(html);
    })

})
// 顺序不能乱
app.use(express.static(path.resolve(__dirname,'dist')));

// 如果访问的路径不存在 默认渲染index.ssr.html, 并把路由定向到当前请求的路径
app.get('*',(req,res)=>{
    // 把渲染成功的字符串扔给客户端,只是返回一个字符串 并没有vue实际功能
    let context = {url:req.url};
    renderer.renderToString(context,(err,html)=>{
        res.send(html);
    });
});
app.listen(4000);