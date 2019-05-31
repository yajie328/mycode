// 模块其实就是一个自执行函数 可以解决模块化的问题
// let r = require('./a');  // 每个node版本寻找顺序不一样,
//node8 会优先找当前目录下的a.js, 然后和找a文件夹下的index.js
// 现在会全部查找a.js文件，文件不存在 才会找a文件夹
// 不能文件夹和文件名字相同
// console.log(r);

// 第三放包
require('a');
console.log(module.paths);
// path 模块
let path =  require('path');
console.log(path.basename('1.js','.js')); // 1
console.log(path.extname('1.min.js')); //.js
console.log(path.join('a','b'));  // a\b
console.log(__dirname); // 目录名  c:\daya\study\mycode\commonjs
console.log(__filename); // c:\daya\study\mycode\commonjs\common.js
console.log(path.join(__dirname,'a.js')); // 这样写目录肯定不会错，常用这个
console.log(path.resolve(__dirname, 'a.js')); // 把一个文件转化成绝对路径
// > 使用： 有/时 用join, 没有就用resolve
console.log(__dirname);// 当前的目录名


//  fs模块
/* let fs= require('fs');
let r = fs.readFileSync(path.resolve(__dirname, './a.js'), 'utf8');
console.log(r);
 */
// 如何让字符串执行 eval / new Funciton

//eval 执行环境 是不干净的 会查找当前执行上下文环境
// 前端模块化 使用eval 但是node的模块化 不使用这种方式
/* let name = 'daya';
eval('console.log(name)'); */

// 请实现一个自己的模板引擎系统 ejs handlebar (new Function)
// 不能实现node模块
/* let a =  'var a = 1; return x+y+e';
let fn = new Function('x','y','e', a); // 前面的是形参，后面是字符串
console.log(fn(1,2,3)); */

// vm 模块
/* let vm = require('vm'); // 沙箱 测试环境 和外界完全隔离
let name = 'daya';
vm.runInThisContext('console.log("name")'); // 不受外界干扰
 */

