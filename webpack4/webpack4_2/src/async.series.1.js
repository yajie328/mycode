

//  所有异步事件执行完后，才会执行回掉方法
class AsyncSeriesHook{ 
    constructor(args){ // args=>['name']
        this.tasks = [];
    }
    tapAsync(name, task){  // 同步注册监听函数
        this.tasks.push(task);
    }
    callAsync(...args){ // 执行
        let finalCallback  = args.pop();
        let index = 0;
        let next = () => {
            if(this.tasks.length === index) return finalCallback();
            let task = this.tasks[index++];
            task(...args, next);
        }
        next();
    }
}

let hook = new AsyncSeriesHook();
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

hook.callAsync('daya',function(){
    console.log('end');
});

// AsyncParralleBailHook() 带保险的异步并发钩子