const Koa = require('./lib/koa');
const fs =  require('fs');
let app =  new Koa();

app.use(async(ctx, next)=>{
    // console.log(ctx.req.url);
    // console.log(ctx.request.url);
    // console.log(ctx.url, ctx.path);
    ctx.body = 'hello';
    await next();
    // await next();
})
app.use(async(ctx, next)=>{
    // console.log(ctx.body);
    // await new Promise((resolve, reject)=>{
    //     setTimeout(()=>{
    //         resolve();
    //     },1000)
    // })
    // ctx.body = 'world';
    ctx.body = fs.createReadStream('middle.js');
})

app.on('error', function(err){
    console.log(err);
})

app.listen(3000, 'localhost',function(){
    console.log('server start port: 3000');
})