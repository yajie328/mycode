// fs fileSystem 文件系统 文件的操作 目录的操作
// fs中的方法部分为同步（require可以马上那会返回值，阻塞主线程） 异步（非阻塞）
// readFile writeFile 异步
// readFileSyna writeFileSync 同步

let fs = require('fs');
let path  = require('path');
// 读到内存 如果文件很大会淹没可用内存
// 读取模式编码是buffer
// 写入的时候默认不给编码就是utf8
// let r = fs.readFileSync(path.resolve(__dirname, './name.txt'),{encoding:'utf8',flag:'r'})
// console.log(r);

// fs.writeFileSync(path.resolve(__dirname, './name.txt'), Buffer.from('大雅啦啦啦'));

// webpack copy-webpack-plugin
// readFile + writeFile适合读取小文件
function copy(source,target){
    fs.readFile(source, function(err, data){
        if(err) return console.log(err);
        fs.writeFile(target, data, function(err){
            if(err) return console.log(err);
            console.log('写入成功');
        })
    })
}
copy(path.resolve(__dirname, './name.txt'), path.resolve(__dirname, './age.txt'))


