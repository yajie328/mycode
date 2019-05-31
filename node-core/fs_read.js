let fs = require('fs');
let path = require('path');
// 现在读取的内存数 fs.read fs.write => 文件流
// fs.open fs.read fs.write fs.close
// 读取之前先open
// flag: r 读取 w写入 s同步 +增加想法操作 x排她方式  a 最近写入
// r+ w+ 区别：
// - 当文件不存在是，r+不会创建，而会导致失败，但W+会创建。
// - 如果文件存在， r+不会自动清空文件， 但W+会自动把已有的文件的内容情况
// mode 权限 读取4 写入2 执行1 chmod -R 777
// 二爷一直 四读书
// file descriptor 文件描述符 number
let buffer =  Buffer.alloc(10);
fs.open(path.resolve(__dirname,'./name.txt'), 'r', 0o666,(err,fd)=>{
    // fd 文件描述符 buffer读取到哪个内存中 0 buffer的偏移量 10 读取的个数, 2读取的开始位置
    fs.read(fd, buffer, 0, 10, 2, (err, bytesRead)=>{ // 实际读取的个数
        console.log(bytesRead);
        console.log(buffer.toString());
    });
})

let buffer =  Buffer.from('大雅你好');
fs.open(path.resolve(__dirname,'./name.txt'), 'r+', 0o666,(err,fd)=>{
    // fd 文件描述符 buffer写入的内容 3 当前写入的buffer位置
    // buffer中选几个写入  2 写入文件的位置
    fs.write(fd, buffer, 3, 6, 2, (err, written)=>{ // 实际写入的个数
        console.log(written);
    });
})


// copy 文件流
function copy(source, target){
    let buffer = Buffer.alloc(3);
    let pos = 0;
    fs.open(source, 'r', function(err, rfd){
        fs.open(target, 'w', function(err, wfd){
            function next(){
                fs.read(rfd, buffer, 0, 3, pos, (err, bytesRead)=>{
                    if(bytesRead>0){ //能读取到内容
                        pos += bytesRead;
                        fs.write(wfd, buffer, 0, bytesRead, function(err, written){
                            next();
                        })
                    }else{
                        // 读取完毕
                        fs.close(rfd,()=>{});
                        fs.close(wfd,()=>{});
                    }
                })
            }
            next();
        })
    })
}
copy(path.resolve(__dirname, './name.txt'),path.resolve(__dirname, './age.txt'));