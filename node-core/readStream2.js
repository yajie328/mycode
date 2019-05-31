let fs = require('fs');
let path =  require('path');

let ReadStream = require('./ReadStream');

let rs = new ReadStream( path.resolve(__dirname, './name.txt'),{
	flag: 'r', 
	highWaterMark: 3,
	mode:0o666, 
	start:0,
	end: 6 , 
	// encoding: 'utf8',
	autoClose: true
});
rs.on('error',()=>{
	console.log('出错了');
})
rs.on('open', function(){
	console.log('文件打开了');
})


rs.on('data', (chunk)=>{
	console.log(chunk);
	rs.pause();
});
setInterval(()=>{
	rs.resume();
},1000)


rs.on('end',()=>{
	console.log("读取完毕")
})
rs.on('close', function(){
	console.log('close');
})