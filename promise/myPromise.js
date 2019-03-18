function Promise(executor){
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onresolveCallbacks = []; // 存放成功的异步队列
    this.onRejectedCallbacks = []; // 存放失败的异步队列
    let self = this;
    function resolve(value){
        if(self.status=='pending'){
            self.value = value;
            self.status = 'fulfilled';
            self.onresolveCallbacks.forEach(fn=>fn());
        }
    }
    function reject(reason){
        if(self.status == 'pending'){
            self.reason = reason;
            self.status = 'rejected';
            self.onRejectedCallbacks.forEach(fn=>fn());
        }
    }

    // 执行器会立即执行
    try{
        executor(resolve, reject);
    }catch(e){ 
        // 如果报错调用执行器的then方法即可
        reject(e);
    }
}
function resolvePromise(promise2, x, resolve, reject){
    if(x===promise2){
        return reject(new TypeError('循环调用'));
    }
    if(x!=null && (typeof x ==='function'|| typeof x ==='object')){
        let called;
        try{
            let then = x.then; // 看看这个对象有没有then方法，如果有说明有可能x是promise    {then: undefined}
            if(typeof then ==='function'){
                then.call(x,y=>{
                    if(called) return;
                    called = true;
                    // resolve(y)
                    // 如果返回的是一个promise这个promise，resolve的结果可能还是一个promise，递归解析直到这个y是一个常量为止
                    resolvePromise(promise2, y, resolve, reject);
                }, r=>{
                    if(called) return;
                    called = true;
                    reject(r);
                })
            }else{
                resolve(x); // {then:{}} {then:123}
            }
        }catch(e){ //这个then方法 是通过ObjectDefinedProperty定义的
            if(called) return
            called = true; // 这个判断为了防止出错后 继续要调用成功逻辑
            reject(e);
        }
    }else{
        resolve(x); // x就是一个普通的常量
    }
}
Promise.prototype.then = function(onfulfilled, onrejected){
    // 参数的可选 ，值得穿透
    onfulfilled = typeof onfulfilled ==='function'? onfulfilled: value=>value;
    onrejected = typeof onrejected === 'function'? onrejected: err=>{throw err};
    let self = this;
    let promise2 = new Promise(function(resolve, reject){

        if(self.status === 'fulfilled'){
            setTimeout(()=>{
                try{
                    var x = onfulfilled(self.value);
                    resolvePromise(promise2, x,resolve,reject);
                }catch(e){
                    reject(e);
                }
            })
        }
        if(self.status === 'rejected'){
            setTimeout(()=>{
                try{
                    var x = onrejected(self.reason);
                    resolvePromise(promise2, x,resolve,reject);
                }catch(e){
                    reject(e)
                }
            })
        }
        if(self.status === 'pending'){
            self.onresolveCallbacks.push(function(){
                setTimeout(()=>{
                    try{
                        var x =  onfulfilled(self.value);
                        resolvePromise(promise2, x,resolve,reject);
                    }catch(e){
                        reject(e)
                    }
                })
            });
            self.onRejectedCallbacks.push(function(){
                setTimeout(()=>{
                    try{
                        var x = onrejected(self.reason);
                        resolvePromise(promise2, x,resolve,reject);
                    }catch(e){
                        reject(e);
                    }
                });
            });
        }
    });
    return promise2;
}
// 测试自己写的promise是否符合promiseaplug规范
// npm install promises-aplus-tests -g
// promises-aplus-tests promise.js
Promise.deferred = function(){
    let dfd = {};
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};
module.exports = Promise;