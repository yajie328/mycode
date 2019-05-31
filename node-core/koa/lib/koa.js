const http =  require('http');
const eventEmmiter =  require('events');
const context =  require('./context');
const request = require('./request');
const response = require('./response');
const Stream = require('stream')

class Application extends eventEmmiter{
    constructor(){
        super();
        this.middleWares = [];
        this.context = Object.create(context);
        this.request =  Object.create(request);
        this.response =  Object.create(response);
    }
    use(callback){
        this.middleWares.push(callback);
    }
    compose(ctx, middleWares){
        let i=-1;
        let dispatch =  async (index)=>{ 
            if(index <= i) return Promise.reject('multi called next()');
            i = index; 
            if(index == middleWares.length) return;
            let middleware = middleWares[index];
           return middleware(ctx, ()=>dispatch(index+1));
        }
       return dispatch(0);
    }
    createContext(req, res){
        let ctx = this.context;
        // 自己封装的
        ctx.request = this.request;
        ctx.response = this.response;
        // 为了可以自己属性上可以拿到req, 就把req挂载到了自己封装的对象上
        ctx.request.req = ctx.req =  req;
        ctx.response.res = ctx.res = res;
        return ctx;
    }
    handler(req, res){
        let ctx =  this.createContext(req, res);
        // 预先先定义一个404
        res.statusCode = 401;
        
        // 把所有的中间件组合
        let p = this.compose(ctx, this.middleWares);
        p.then(()=>{
            let body = ctx.body;
            if(body instanceof Stream){
                console.log(body.path);
                res.setHeader('Content-Type', 'application/octet-stream');
                // 下载头部设置
                res.setHeader('Content-Disposition', `attachment; filename=${body.path}`);
                body.pipe(res);
            }else if(body){
                res.end(body);
            }else{
                res.end(`Not Fount`)
            }
        }).catch((err)=>{
            this.emit('error', err);
        })
    }
    listen(...args){
        let server = http.createServer(this.handler.bind(this));
        server.listen(...args)
    }
}

module.exports = Application;