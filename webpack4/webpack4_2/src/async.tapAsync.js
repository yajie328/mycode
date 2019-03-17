
//  所有异步事件执行完后，才会执行回掉方法
class AsyncHarralleHook{ 
    constructor(args){ // args=>['name']
        this.tasks = [];
    }
    tapAsync(name, task){  // 同步注册监听函数
        this.tasks.push(task);
    }
    callAsync(...args){ // 执行
       let finalCallback =  args.pop(); // 拿出最终的函数
       let index = 0;
       let done = () =>{
            index++;
            if(index == this.tasks.length){
                finalCallback()
            }
       }
       this.tasks.forEach(task=>{
           task(...args, done);
       })
    }
}

let hook = new AsyncHarralleHook();
let total = 0;
hook.tapAsync('react', function(name, cb){
    setTimeout(()=>{
        console.log('react', name);
        cb();
    }, 1000)
});
hook.tapAsync('node', function(name, cb){
    setTimeout(()=>{
        console.log('node', name);
        cb();
    }, 1000)
});

hook.callAsync('daya', function(){
    console.log('end');
});
