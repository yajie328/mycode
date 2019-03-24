// let Promise = require('./promise');
let fs = require('fs');
// 1.
/* function read(url){
    return new Promise(function(reslove, reject){
        fs.readFile(url,'utf8', function(err,data){
            if(err) return reject(err);
            reslove(data);
        })
    });
} */
//2.
/* function read(url){
    let defer = Promise.deferred();
    fs.readFile(url,'utf8', function(err,data){
        if(err) defer.reject(err);
        defer.resolve(data);
    })
    return defer.promise;

} */

// 异步 和链式调用
/* read("./promise/name.text").then(data=>{
    // 成功
    // 1如果then里面的这个函数 返回的是一个promise，会让这个promise执行，并且采用这个promise的状态作为下一个then的执行情况，如果成功执行then的第一个参数
    // 2如果then里面的这个函数返回是一个普通值，直接作为下一个then的成功参数
    // 失败
    // 3执行then的失败态只有两种情况： 1.then函数返回一个失败的promise 2.在then中抛出异常 会进入下一个then的失败态(第二个参数)
    return read("./promise/"+data);
}).then(data=>{
    console.log(data, '1');
    return 100;
    // throw new Error('err')
}, err=>{
    console.log(err,'err');
}).then(data=>{
    console.log(data,'2');
}, err=>{
    console.log(err,'3')
}); */

// 链式调用
/* var p = new Promise(function(reslove, reject){
    reslove('123')
    // reject('err456');
});
var p2 = p.then(data=>{
    console.log(data,'1');
    // throw new Error('err123');
    // return 100
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve('123');
        },0)
    })
}, err=>{
    console.log(err,'err1');
    return err;
}).then(data=>{
    console.log(data,'2')
    return data;
},err=>{
    console.log(err, 'err2')
}) */

// 值的穿透
/* p.then().then().then(data=>{
    console.log(data);
},err=>{
    console.log(err);
})
 */

 //catch  finally
 /* let Promise = require('./promise');
 var p = new Promise((resolve, reject)=>{
     setTimeout(function(){
        reject('fail');
        // resolve('success');
    })
 });
 p.finally(()=>{
    console.log('finally0')
 }).then(data=>{
     console.log(data);
     return data;
 }, err=>{
     console.log(err);
     return err;
 }).catch(err=>{
     console.log(err);
     return 'aaa';
 }).finally(()=>{
     setTimeout(()=>{
         console.log('finally1');
    },1000)
 }).then(data=>{
     console.log(data);
 }).finally(()=>{
     console.log('finally2');
 }); */

 //finally0
// success
// success
// finally2
// finally1
// -------------
// finally0
// fail
// fail
// finally2
// finally1

// then是异步的
/*  */

/* let p = new Promise(resolve=>{
    console.log(3);
    resolve();
}).then(data=>{
    console.log(1)
});
console.log(2);  */
//3 2 1
// let Promise = require('./myPromise');
let p = new Promise((resolve,reject)=>{
    reject(123)
}).finally(()=>{
    console.log('fainally0')
}).then(null, err=>{
    console.log(err+'000');
    return new Promise((resolve, reject)=>{
        reject(456)
    })
}).catch((data)=>{
    console.log(data);
    return 'actch';
}).finally(function(){
    console.log('finally1');
}).then(data=>{
    console.log(data);
}).finally(function(){
    console.log('finally2');
});