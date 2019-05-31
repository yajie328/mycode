// 宏任务 (第一次代码执行的环境 script标签、 setTimeout
// 微任务   Promise.then  mutationObserver

// 异步 setTimeout ajax

//单线程 （主线程是单线程的）
// webwork 辅助线程 单独开的一个线程

// 主线程执行中完后 会扫描队列有没有,按顺序把执行队列里拿过去执行

//浏览器 先执行整个宏任务，默认当前栈执行完毕后， 然后再清空微任务队列， 
// 然后在取宏任务（setTimeout回调函数队列）第一个执行，（可能执行过程中会注册一些微任务，再执行下一个宏任务前在然后再去微任务队列看看有没有）,
// 再去执行下一个宏任务

setTimeout(function(){
    Promise.resolve().then(()=>{
        console.log('settimeout-then')
        Promise.resolve().then(()=>{
            console.log('settimeout-then')
            Promise.resolve().then(()=>{
                console.log('settimeout-then')
            })
        })

    })
    console.log(1)
})
setTimeout(function(){
    console.log(2)
})
setTimeout(function(){
    console.log(3)
})

Promise.resolve().then(()=>{
    console.log('then')
})
Promise.resolve().then(()=>{
    console.log('then')
})
/* 
then
then
1
settimeout-then
settimeout-then
settimeout-then
2
3 
*/

//vue $nextTick(()=>{}) 异步方法
// mic(promise.then、mutationObserver) 
// mac setImmediate > setTimeout  MessageChanel ui script

// mac MessageChanel ui script