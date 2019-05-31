const Koa = require('./lib/koa');

let app = new Koa();
app.use(function(ctx, next){
    ctx.body = '1';
    console.log(1);
    next();
    console.log(2);
})
app.use((ctx, next)=>{
    console.log(3);
    ctx.body='2';
    next();
    console.log(4);
})
app.use((ctx, next)=>{
    console.log(5)
    ctx.body = '3';
    next();
    console.log(6);
})
app.listen(3000,function(){
    console.log('server start 3000')
})