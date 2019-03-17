let {SyncHook,SyncBailHook, SyncWaterfallHook, SyncLoopHook} = require('tapable');

class Lesson{
    constructor(){
        this.index = 0;
        this.hooks = {
            arch: new SyncLoopHook(['name'])
        }
    }
    tap(){ //注册监听函数
        this.hooks.arch.tap('node', (name)=>{
            console.log('node', name);
            // return 'node学的不错';
           return  ++this.index === 3? undefined: "继续学";
        });
        this.hooks.arch.tap('react', (data)=>{
            console.log('react', data)
        });
    }
    start(){
        this.hooks.arch.call('daya');
    }
}

let l = new Lesson();
l.tap();// 注册这两个事件
l.start(); // 启动钩子