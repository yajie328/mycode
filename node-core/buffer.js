// 声明buffer方式  固定长度 
let buffer1 = Buffer.alloc(5); 
console.log(buffer1);//<Buffer 00 00 00 00 00>

// 固定的内容
let  buffer2 = Buffer.from('大雅'); // 16进制 buffer和字符串可以相互转化
console.log(buffer2); //<Buffer e5 a4 a7 e9 9b 85> 

// 通过数据来声明buffer 0b 二进制 0 八进制 0x 16进制控制台打印不出来其它机制的
let buffer3 =  Buffer.from([0x16]);
console.log(buffer3);

// 实现进制转化 16 => 2
console.log((0x16).toString(2)); // 10110

// 任意进制转化成10进制
console.log(parseInt('10110', 2));  //22
// 转base64
console.log(buffer2.toString('base64')); //5aSn6ZuF
// base64解码
console.log(Buffer('5aSn6ZuF', 'base64').toString()); //大雅


// buffer中放的都是内存
let buf =  Buffer.from('大雅你好');
console.log(buf); //<Buffer e5 a4 a7 e9 9b 85 e4 bd a0 e5 a5 bd>
let newBuf =  buf.slice(2);
console.log(newBuf); // <Buffer a7 e9 9b 85 e4 bd a0 e5 a5 bd>
newBuf[0] = 100;
console.log(buf.toString()); //�d雅你好

// buffer的方法 slice length(字节长度) indexof
console.log(buf.length);//12
console.log(buf.indexOf('雅')); //3

// 自己实现split

Buffer.prototype.split =  function(sep){
    let leng =  Buffer.from(sep).length; // 
    let pos = 0;
    let arr=[];
    let current;
    while((current = this.indexOf(sep,pos)) != -1){
        arr.push(this.slice(pos,current));
        pos = current + leng;
    }
    arr.push(this.slice(pos));
    return arr;
}

let buf2 = Buffer.from("我是大雅你是大雅他是大雅我们");
let arr = buf2.split('大雅');  //['我是','你是','他是'，'我们']
console.log(arr.toString());



// base64  原理：把汉字24位 3*8  转化成4*6
let buf3 = Buffer.from('大');
console.log(buf3.toString()); //e5 a4 a7

console.log((0xe5).toString(2)); 
console.log((0xa4).toString(2)); 
console.log((0xa7).toString(2)); 
//11100101  10100100 10100111

// 111001 011010 010010 100111
console.log(parseInt('111001',2)); // 57
console.log(parseInt('011010',2)); //26
console.log(parseInt('010010',2)); //18
console.log(parseInt('100111',2)); // 39

// base64做编码转化
let str = 'abcdefghigklmnopqrstuvwxyz'.toUpperCase();
str += 'abcdefghigklmnopqrstuvwxyz';
str += '0123456789+/';
console.log(str[57] + str[26]+ str[18]+str[39]) //5aSn

// 验证一下是不是5aSn， 果然不错，哈哈
console.log(Buffer('5aSn','base64').toString()); // 大


let buf4 =  Buffer.from('12');
let buf5 = Buffer.from('34');
// 判断是否Buffer
// console.log(Buffer.isBuffer(buf4)); //true

// copy
// buf.copy(target, targetStart, souseStart, souseEnd)

// let target = Buffer.alloc(12);

// 自己实现copy
Buffer.prototype.copy =  function(target, targetStart, sourceStart=0, sourceEnd = this.length){
    for(let i = 0; i<sourceEnd-sourceStart; i++){
        target[targetStart+i] =  this[sourceStart+i]
    }
}
// buf4.copy(target, 0, 0, 6);
// buf5.copy(target, 6, 0, 6);
// console.log(target.toString()); //大雅你好


// concat
Buffer.concat =  function(list, totalLength =  list.reduce((a,b)=>{return a + b.length}, 0)){
    let buffer = Buffer.alloc(totalLength);
    let offset = 0;
    list.forEach(buff=>{
        buff.copy(buffer, offset);
        offset += buff.length;
    });

    return buffer;
}
let newBuf = Buffer.concat([buf4, buf5], 100); 
console.log(newBuf.toString()); //大雅你好