let Promise = require('./myPromise');
let fs = require('fs');
// 1.
// function read(url){
//     return new Promise(function(reslove, reject){
//         fs.readFile(url,'utf8', function(err,data){
//             if(err) return reject(err);
//             reslove(data);
//         })
//     });
// }
//2.
function read(url){
    let defer = Promise.deferred();
    fs.readFile(url,'utf8', function(err,data){
        if(err) defer.reject(err);
        defer.resolve(data);
    })
    return defer.promise;

}

// 异步 和链式调用
read("./json/name.json").then(data=>{
    console.log(data);
    // 如果返回的是一个promise，会让这个promise执行，并且采用他的状态作为下一个then的值
    return read('./json/age.json');
}).then(data=>{
    console.log(data);
});

// 链式调用
/* var p = new Promise(function(reslove, reject){
    // reslove('123')
    reject('err');
});
var p2 = p.then(data=>{
    console.log(data);
    return 222
}, err=>{
    console.log(err);
    return err;
}).then(data=>{
    console.log(data)
    return data;
}).then(data=>{
    console.log(data)
}); */

// 值的穿透
/* p.then().then().then(data=>{
    console.log(data);
},err=>{
    console.log(err);
})
 */