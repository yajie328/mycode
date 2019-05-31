let Koa = require('koa');
let Router = require('./lib/koa-router');

let app = new Koa();
let router =  new Router();

router.get('/', (ctx, next)=>{
    ctx.body = '/';
    // next();
}).get('/upload', (ctx, next)=>{
    ctx.body = '/upload';
    // next();
})

router.get('/user', (ctx, next)=>{
    ctx.body="/user"
    // next();
})

app.use(router.routes());
app.use(async (ctx, next)=>{
    ctx.body = 'daya';
})

app.listen(3000,'localhost', function(){
    console.log('server start 3000....')
})


