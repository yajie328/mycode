let fs = require('fs');
let path = require('path');

// 实现连续路径
// function mkdirSync(paths){
//     let arr = paths.split('/');
//     // [a a/b a/b/c a/b/c/d]
//     for(let i=0; i<arr.length; i++){
//         let curPath =  arr.slice(0, i+1).join('/');
//         try{
//             fs.accessSync(curPath); // 查看目录是否存在,如果不存在会报错
//         }catch(e){

//             fs.mkdirSync(curPath);
//         }
//     }
// }
// // fs.mkdirSync('a/b/c/d'); // 默认有父级才能创建
// mkdirSync('a/b/c/d');

// function mkdir(paths, cb){
//     let arr = paths.split('/');
//     function next(index){
//         if(index >= arr.length) return cb();
//         let curPath = arr.slice(0, index+1).join('/');
//         // fs.exists 已废弃
//         fs.access(curPath,(err)=>{
//             if(err){
//                 fs.mkdir(curPath,()=>next(index+1));
//             }else{
//                 next(index+1);
//             }
//         })
//     }
//     next(0);
// }
// // 异步创建
// mkdir('a/b/c/d', ()=>{
//     console.log('创建成功')
// })

// 目录的删除 rmdirSync 
// 删除文件 unlinkSync
//fs.statSync 文件的状态 statObj.isDirectory() 是否目录 isFile()是否文件;
// fs.readdirSync 读取目录，返回的是一个数组
// 先 中 后序   深度 广度

fs.rmdirSync('a'); // 默认如果不为空不能删除

// 不管是否为空，整个删除目录
// 1) 先序 深度 遍历（同步）
function rmDirSync(dir){
    let statObj = fs.statSync(dir);
    if(statObj.isDirectory()){
        let dirs =  fs.readdirSync(dir); // 拿到目录后 需要加上父级
        // 把路径进行处理
        for(let i=0; i<dirs.length; i++){
            let curPath =  path.join(dir,dirs[i]);
            rmDirSync(curPath);
        }
        // 子集都删完了再删除自己
        fs.rmdirSync(dir);
    }else{
        // 文件直接删除
        fs.unlinkSync(dir);
    }

}
rmDirSync('a');

// 2） 广度遍历（同步）

function wideRmSync(dir){
    let arr = [dir];
    let index = 0;
    let current; // 读取的当前的项目
    while(current = arr[index++]){
        let statObj = fs.statSync(current);
        if(statObj.isDirectory()){
            let dirs = fs.readdirSync(current);
            dirs = dirs.map(d=>path.join(current,d));
            arr = [...arr, ...dirs];
        }
    }
    // 倒着删除
    for(let i=arr.length-1; i>=0; i--){
        let statObj =  fs.statSync(arr[i]);
        if(statObj.isDirectory()){
            fs.rmdirSync(arr[i]);
        }else{
            fs.unlinkSync(arr[i]);
        }
    }
    console.log(arr);
}
wideRmSync('a');

// 异步删除
// 1) 先序 深度 串行

function rmdirSeries(dir, callback){
    fs.stat(dir,(err,statObj)=>{
        if(statObj.isDirectory()){
            // 读取目录列表
            fs.readdir(dir, (err,dirs)=>{
               dirs =  dirs.map(d=>path.join(dir, d));
               function next(index){
                   if(index === dirs.length) return fs.rmdir(dir,callback);
                   // 先取出数组中的第一个， 第一个删除后 再删除第二个
                    rmdirSeries(dirs[index],()=>next(index+1))
               }
               next(0);
            })
        }else{
            fs.unlink(dir,callback);
        }
    })
}
rmdirSeries('a', ()=>{
    console.log('删除成功')
})

// 2） 异步 先序 并发 删除
function removeDirParalle(dir){
    fs.stat(dir,(err,statObj)=>{
        if(statObj.isDirectory()){
            // 读取目录列表
            fs.readdir(dir, (err,dirs)=>{
                if(dirs.length == 0){
                    return fs.rmdir(dir);
                }
                dirs =  dirs.map(d=>{
                    let current = path.join(dir, d);
                    // 每个人删除后 就会调用done方法
                    removeDirParalle(current, done);
                    return current;
                });
                
                // 并发删除
                let index= 0;
                function done(){
                    if(++index === dir.length){
                        fs.rmdir(dir, callback);
                    }
                }

            })
        }else{
            fs.unlink(dir,callback);
        }
    })
}
removeDirParalle('a', ()=>{
    console.log('删除成功')
});