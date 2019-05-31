let fs = require('fs');
let path = require('path');

let ws = fs.createWriteStream(path.resolve(__dirname,'./name.txt'),{
    flag: 'w',
    mode: 0o666,
    autoClose: true,
    encoding: 'utf8',
    highWaterMark: 2 // highWaterMark预期使用的内存
});
// 可写流 
// 写入的过程是异步的
// 写入的内容只能是String or buffer 
// 写入内容的长度 > highWaterMark 返回false
// flag不代表是否写入成功
// let flag = ws.write('1111'); 
// ws.write('22222'); 
// ws.write('3333')
// 第一个是真正的像文件中写入  其他写入会排队[222,333]
// if flag 返回false 就不要就写入了，如果再写入肯定会超出预期

// 写入9个数
// let i= 9;
// while(i--){
//     ws.write(i+'');
// }

// 写2个就停了
let i = 9;
function write(){
    let flag = true;
    while(i && flag){
       flag = ws.write(i--+'');
    }
}
write();
// 抽干，当我们的预计的大小的内容相等或者写入的内容大于预计的内存会触发次方法
//  当我们写入的内容都写入完成后会触发此方法
ws.on('drain',()=>{ 
    console.log('drain');
    write();
});