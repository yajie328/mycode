let {AsyncParallelHook} = require('tapable');
// 异步钩子 (串行) 并行需要等待所有并发的异步事件执行后在执行回掉方法
// 同时发送多个请求
// 注册方法 分为 tap注册 tapAsync 
// tapable库中有三种注册方法 tap 同步注册、 tapAsync(cb) 异步注册 、 tapPromise(注册的是promise)
// call callAsync callPromise
class Lesson{
    constructor(){
        this.hooks = {
            arch: new AsyncParallelHook(['name'])
        }
    }
    tap(){ //注册监听函数
        this.hooks.arch.tapPromise('node', (name)=>{
            return new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    console.log('node', name);
                    resolve();
                },1000)
            })
        });
        this.hooks.arch.tapPromise('react', (name)=>{
            return new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    console.log('react', name);
                    resolve();
                },1000)
            })
        });
    }
    start(){
        // this.hooks.arch.callAsync('daya', function(){
        //     console.log('end');
        // })
        this.hooks.arch.promise('daya').then(function(){
            console.log('end');
        });
        
    }
}
let l = new Lesson();
l.tap();// 注册这两个事件
l.start(); // 启动钩子