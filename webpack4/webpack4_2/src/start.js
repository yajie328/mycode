let {AsyncSeriesHook} = require('tapable');
// 异步串行
class Lesson{
    constructor(){
        this.hooks = {
            arch: new AsyncSeriesHook(['name'])
        }
    }
    tap(){ //注册监听函数
        this.hooks.arch.tapPromise('node', (name, cb)=>{
            return new Promise((resolve, reject)=>{
                setTimeout(() => {
                   console.log('node', name);
                   resolve();
               }, 1000)
            })
        });
        this.hooks.arch.tapPromise('react', (name, cb)=>{
            return new Promise((resolve, reject)=>{
                setTimeout(() => {
                   console.log('react', name);
                   resolve();
               }, 1000)
            })
        });
    }
    start(){
        this.hooks.arch.promise('daya').then(function(){
            console.log('end');
        })
        
        
    }
}
let l = new Lesson();
l.tap();// 注册这两个事件
l.start(); // 启动钩子