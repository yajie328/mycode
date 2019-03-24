let Promise = require('./promise');
// let Promise = require('./myPromise2');
let p = new Promise(function(resolve, reject){
    // resolve('123');
    reject('fail');
    // throw new Error('报错');
 /*    setTimeout(()=>{
        resolve('123');
    },1000) */
});

// p.then((data)=>{
//     console.log(data,succ1);
// },(err)=>{
//     console.log(err,'err1');
// });

p.then((data)=>{
    console.log(data,'succ2');
    return data;
},(reson)=>{
    console.log(reson,'err2');
    return reson;
}).then(data=>{
    console.log(data);
})

