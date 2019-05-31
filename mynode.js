/* 
console.log(this); //{} module.exports
console.log(this == exports); // true
console.log(this ==  module.exports); // true
 */
// 在浏览器中可以访问window  浏览器中不能访问global window代理了global
// 在服务端可以直接访问global上的属性
// console.dir(Object.keys(global));
// process 进程 当前的执行的环境

// Buffer 可以读写文件 内存中 Buffer 
//  宏setImmediate任务
// setTimeout  setInterval

// 默认把v8引擎上的方法 给隐藏掉了 eval decodeURIComponent
// console.dir(global,{showHidden:true}); 

// console.log(Object.keys(process));
// argv 运行时传递的参数  //[ '--config', 'xxx.config.js', '--port', '3000' ]
let obj = process.argv.slice(2).reduce((memo,b, index, arr)=>{
    if(b.includes('--')){ // 如果有--就是key， 下一项就是值
        memo[b.slice(2)] = arr[index+1];
    }
    return memo;
},{});
// console.log(obj); //{ config: 'xxx.config.js', port: '3000' }

// env 环境变量（在当前运行的命令中 可以设置一个变量  export NODE_ENV=development）
// console.log(process.env.NODE_ENV); // 不管用

//cwd 当前的运行目录 node运行的目录
// console.log(process.cwd()); // http-server(通过这个变量可以知道在哪里运行的)
// nextTick （微任务）只能在node里面用
// 宏任务 setImmediate setTimeout readFile
//promsie.then nextTick MutationObserver|messageChannel 微任务

/* setImmediate(()=>{
    console.log('setImmediate')
});
 */
setTimeout(()=>{
    console.log('setTimeout1');
    process.nextTick(()=>{
        console.log('nexttick1')
    });
})

// 以上两个顺序是随机的

process.nextTick(()=>{
    console.log('nexttick2');
    setTimeout(()=>{
        console.log('setTimeout2');
    });
    Promise.resolve().then(()=>{
        console.log('then');
    })
});
// nexttick2 then setTimeout1 setTimeout2nexttick1

// 主桟执行后 会执行其它任务
// 和浏览器一样的，取一个宏任务会把里面的微任务执行完， 不一样的是 每个阶段都有一个自己的队列
// stdin

// stdout

setTimeout(()=>{
    console.log('setTimeout1');
    Promise.resolve().then(()=>{
        console.log('then1')
    });
})
Promise.resolve().then(()=>{
    console.log('then2');
    setTimeout(()=>{
        console.log('setTimeout2');
    });
    console.log('promise');
});
// node环境下:
// then2 promise setTimeout1 setTimeout2 then1
// 浏览器环境下：
// then2 promise setTimeout1 then1 setTimeout2

const fs = require('fs');
fs.readFile("./promise/age.txt",()=>{
    setTimeout(()=>{
        console.log('timeout');
    },0);
    setImmediate(()=>{
        console.log('immediate');
    })
})
// i/o cycle
// node事件环和浏览器是一样的，但是里面每个都有一个队列 执行时按照顺序执行的 ，如果在poll阶段没有check的话，会等待定时器的完成 所以顺序是死的
// 和浏览器一样 ，但是在readFile中有check会先走check
//immediate  timeout
