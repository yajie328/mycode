let fs = require('fs');

// 把node的异步函数封装成promise
function promisify(fn){
    return function(...args){ //(url, urf8)
        return new Promise((resolve, reject)=>{
            fn(...args, function(err,data){
                if(err) reject(err);
                resolve(data);
            })
        })
    }
}

let read = promisify(fs.readFile);
let write = promisify(fs.writeFile);
read("./promise/age.txt","utf8").then(data=>{
    console.log(data+"---");
}, err=>{
    console.log(err + 'err');
});
write('./promise/age.txt', '大雅18岁').then(data=>{
    console.log('ok');
},err=>{
    console.log('写入失败');
})


// fs.readFile('./promise/age.txt','utf8',function(err,data){
//     console.log(data);
// })