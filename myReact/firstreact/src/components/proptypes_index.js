import React from 'react';
import ReactDOM from 'react-dom';
// import OldContext  from './components/oldContext'
// ReactDOM.render(<OldContext/>, document.querySelector("#root")); 
import Person from './components/propTypes'
let props = {
    name: 'daya', // 字符串 必填
    age: 18, // 数字 必填而且布恩小于18岁
    gender:'女', //只能时男或女
    isMarried: true, // 是否已婚
    hobby:['smoking', 'drinking'], // 字符串数组
    position: {x:100, y:100} // 拥有x y 属性对象
}
ReactDOM.render(<Person {...props} />, document.getElementById('root'));