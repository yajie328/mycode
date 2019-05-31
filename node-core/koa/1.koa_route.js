let Koa = require('koa');
let Router = require('koa-router');

let app = new Koa();
// let router =  new Router({
//     prefix: '/user' // 虚拟出一个路径
// });
let router = new Router();  
let router1 = new Router();
let router2 = new Router();
router1.get('/add', async (ctx, next)=>{
    ctx.body = '/add';
    next();
})
router1.post('/', async (ctx, next)=>{
    ctx.body = '/';
    next();
})

router2.get('/students', async (ctx, next) => {
    ctx.body = '/students';
})
router2.get('/teacher', async (ctx, next)=>{
    ctx.body = '/teacher';
})

// 把两个子路由挂载到父路由上
router.use('/user', router1.routes());
router.use('/school',router2.routes());
// 挂载路由
app.use(router.routes());
app.use(router.allowedMethods())


app.listen(3000,'localhost', function(){
    console.log('server start 3000....')
})


