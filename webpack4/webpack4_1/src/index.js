// webpack打包我们的图片
// 1) 在js中创建图片来引入
// file-loader 默认会在内部生成一张图片 到build目录下
// 把生成的图片的名字返回回来
import logo from './logo.png'; // 把图片引入，返回的结果是一个新的图片地址
let image = new Image();
console.log(logo)
// image.src = './logo.png'; // 就是一个普通的字符串, 不会打包进去，要通过import或require引入进来
image.src = logo;
document.body.appendChild(image);
// 2) 在css引入 background('url')
// import './index.css';
// 3) <img src="" alt=""/>



// import $ from 'expose-loader?$!jquery';
// expose-loader 暴露 全局的loader  内联的loader
// pre 前面执行的loader  normal 普通loader  内联loader  后置 postloader
// console.log(window.$); // 在每个模块中注入 $对象

// 1) expose-loader 暴漏到window上
// 2) providePlugin 给每个人提供一个$
// 3) 引入不打包
// import $ from 'jquery';
// console.log($);

// import a from './a.js';
// console.log(a);

let str = require('./a.js');
console.log(str);

console.log('大雅学习webpack');



// 引入css模块
require('./index.css');

require('./index.less');

// let fn = a=>{
//     console.log(a);
// }
// fn(2);

// @log 
// class A{
//     a = 1;
// }

// let a = new A();
// console.log(a.a)

// function log(target){
//     console.log(target, '23');
// }




