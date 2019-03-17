// SyncBailHook 同步保险钩子 只要有一个钩子函数返回了一个非undefined结果，就会停止执行
// SyncWaterfallHook  瀑布 上面的钩子执行返回结果给下一个钩子， 一步步往后抛
//SyncLoopHook  同步遇到不返回undefined的函数会多次执行，比如想让某个函数执行n遍
class SyncLoopHook{ 
    constructor(args){ // args=>['name']
        this.tasks = [];
        this.index = 0;
    }
    tap(name, task){  // 同步注册监听函数
        this.tasks.push(task);
    }
    call(...args){ // 执行
        console.log(...args);
        // synchook
        // this.tasks.forEach(task => task(...args));
       // syncbailhook
       /*
       let ret; // 当前这个函数的返回值
       let index = 0;
        do{
          ret =  this.tasks[index++](...args);
        }while(ret === undefined && index<this.tasks.length);
    */
   // water 把上一步的结果往后抛
   /*
        let [first, ...others] = this.tasks;
        let ret = first(...args);
        others.reduce((prev, next)=>{
          return next(prev);
        },ret);
        */
       this.tasks.forEach(task=>{
           let ret;
           do{
              ret =  task(...args);
           }
           while(ret != undefined)
       })
    }
}

let hook = new SyncLoopHook();
let total = 0;
hook.tap('react', function(name){
    console.log('react', name);
    return ++total === 3? undefined: 'reactok';
});
hook.tap('node', function(data){
    console.log('node', data);
    // return 'nodeok'
});
hook.tap('webpack', function(data){
    console.log('webpack', data);
});
hook.call('daya');
