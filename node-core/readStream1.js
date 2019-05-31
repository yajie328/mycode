let fs = require('fs');
let path =  require('path');

let rs = fs.createReadStream( path.resolve(__dirname, './name.txt'),{
	flag: 'r', // 打开文件做什么事 r w r+ w+ a ..
	highWaterMark: 2, // 每次读取几个字节数 默认每次读取64K文件内容
	mode:0o666, // 可读可写
	start:0, // 开始读取位置
	end: 6 , //结束读取位置
	// encoding: 'utf8', // 读取的内容 如果gbk的，强行转化urf8会乱码
	autoClose: true
});
rs.on('error',()=>{
	console.log('出错了');
})
rs.on('open', function(){
	console.log('文件打开了');
})


// rs 是内部new ReadStream产生的
// open data end close pause resume
// 默认创建可读流， 不会马上读取 如果我们监听了data事件
// 默认非流动模式 一旦监听了data事件，就变为流动模式
let str = '';
let arr = []; // 拼接buffer,默认有人用字符串拼接，可能会导致乱码
rs.on('data', (chunk)=>{
	arr.push(chunk);
	console.log(chunk);
	rs.pause();// 暂停data事件的触发
});

setInterval(()=>{
	rs.resume(); // 恢复的就是data事件
}, 1000);

rs.on('end',()=>{
	console.log(Buffer.concat(arr).toString());
	console.log("读取完毕")
})
rs.on('close', function(){
	console.log('close');
})