class Router{
    constructor(){
        this.middlewares = [];
    }

    get(path, handler){
        this.middlewares.push({
            path,
            handler
        })
        return this; // 链式调用
    }
    compose(routers, ctx, next){
       async function dispatch(index){
           if(index == routers.length) next();
            let route = routers[index].handler;
            route(ctx, ()=>dispatch(index+1))
        }
        dispatch(0)
    }
    routes(){
        return async (ctx, next)=>{
            let  path =  ctx.path;
            let routers = this.middlewares.filter((router)=>router.path === path);
            this.compose(routers, ctx, next);
        }


    }
}

module.exports = Router;