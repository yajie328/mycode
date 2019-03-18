let Promise = require('./myPromise');
let p = new Promise(function(reslove, reject){
    // reslove('123');
    // reject('fail');
    // throw new Error('报错');
    setTimeout(()=>{
        reject('123');
    },1000)
});
p.then((data)=>{
    console.log(data,'成功');
},(reson)=>{
    console.log(reson,'失败')
})
p.then((data)=>{
    console.log(data,'成功');
},(reson)=>{
    console.log(reson,'失败');
})

