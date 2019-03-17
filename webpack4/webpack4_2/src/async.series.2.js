

//  所有异步事件执行完后，才会执行回掉方法
class AsyncSeriesHook{ 
    constructor(args){ // args=>['name']
        this.tasks = [];
    }
    tapPromise(name, task){  // 同步注册监听函数
        this.tasks.push(task);
    }
    promise(...args){ // 执行
        let [first, ...others] = this.tasks;
        others.reduce((pre, next)=>{ //redux源码
          return  pre.then(()=>next(...args))
        }, first(...args))
        
    }
}

let hook = new AsyncSeriesHook();
let total = 0;
hook.tapPromise('react', function(nam){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('react', name);
            resolve();
        }, 1000)
   }) 
});
hook.tapPromise('node', function(name){
   return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('node', name);
            resolve();
        }, 1000)
   }) 
});

hook.promise('daya').then(function(){
    console.log('end');
});

// AsyncParralleBailHook() 带保险的异步并发钩子