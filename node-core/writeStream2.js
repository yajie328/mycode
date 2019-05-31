let fs = require('fs');
let path = require('path');
let WriteStream = require('./WriteStream');

let ws = new WriteStream(path.resolve(__dirname,'./name.txt'),{
    flags: 'w',
    mode: 0o666,
    autoClose: true,
    // encoding: 'utf8',
    highWaterMark: 2 // highWaterMark预期使用的内存
});
let i = 9;
function write(){
    let flag = true;
    while(i && flag){
       flag = ws.write(i--+'','utf8', ()=>{
        //    console.log('成功')
       });
    }
}
write();
// 抽干，当我们的预计的大小的内容相等或者写入的内容大于预计的内存会触发次方法
//  当我们写入的内容都写入完成后会触发此方法
// console.log(ws);
ws.on('drain',()=>{ 
    console.log('drain');
    write();
});
// let flag = ws.write('123');
// console.log(flag);