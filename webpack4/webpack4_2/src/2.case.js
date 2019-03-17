class SyncHook{ // 钩子是同步的
    constructor(args){ // args=>['name']
        this.tasks = [];
    }
    tap(name, task){  // 同步注册监听函数
        this.tasks.push(task);
    }
    call(...args){ // 执行
        console.log(...args);
        this.tasks.forEach(task => task(...args));
    }
}

let hook = new SyncHook();
hook.tap('react', function(name){
    console.log('react', name);
});
hook.tap('node', function(name){
    console.log('node', name);
});
hook.call('daya');
