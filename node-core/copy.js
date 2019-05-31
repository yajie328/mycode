let fs = require('fs');
let WriteStream = require('./WriteStream.js')
let ReadStream = require('./ReadStream.js');

// let rs = fs.createReadStream('./name.txt');

// let ws = fs.createWriteStream('./age.txt', {highWaterMark:1});

let rs = new ReadStream('./name.txt',{highWaterMark:4});
let ws = new WriteStream('./age.txt', {highWaterMark:1});
// 拿不到读取的内容 或者写入的内容 不能控制中介的流程 rs.on('data') 
// fs.readFile 不能处理大文件
rs.pipe(ws); // 可以实现拷贝

// ws.write('321');
// ws.write('543');
// ws.end('978000'); // 强制把内存中的清空 并且关闭文件
// ws.end(); // 文件已经关闭 就不能再写入 如果end中传递参数会继续调用 write方法 fs.close