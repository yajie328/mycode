import React from './react'; // react核心包
import ReactDOM from './react-dom'; //Dom 操作包

// react 负责渲染的
// 使用jsx语法  =  javascript+xml 即js和html混合语法

/* function formUser(user){
    return user.firstName + user.lastName;
}
let user = {
    firstName: 'chen',
    lastName: 'daya'
} */
// {} 内可以放表达式，表达式必须有返回值
//1. element
/* let element = (
    <h1 id="myid" className="myclass" style={{ color:"red"}}>
    hello
    <span>yaya</span>
    <div>啦啦啦</div>
    </h1>
) */


/* let element = React.createElement("h1", {
    id: "myid",
    className: "myclass",
    style: {
      color: "red"
    }
  }, "hello", React.createElement("span", null, "daya")); */

//   ReactDOM.render(element,document.getElementById('root'));

// 2. 组件 纯函数 首字母大写
// props是组件的属性   // console.log(props) //{name: "daya", id: "aa"}
  /* function Welcome(props){
  return <h1>hello{props.name}</h1>
 }
let element = <Welcome name="daya" id="aa"/> */

// babel转移后如下：
// function Welcome(props) {
//     return React.createElement("h1", null, "hello", props.name);
//   }
  
//   let element = React.createElement(Welcome, {
//     name: "daya",
//     id: "aa"
//   });
//   console.log(element);

/** 
 * 3 .类组类
  */
class Welcome extends React.Component{ 
    constructor(props){
        super(props);
    }
    render(){
        return <h1>hello{this.props.name}</h1>
    }
}
let element = <Welcome name="daya"/>
console.log(element);

ReactDOM.render(element, document.getElementById('root'))


/**
 * <h1 id="myid" className="myclass">hello<span>yaya</span></h1>
 * 
 * 等同于：
 React.createElement("h1", {
  id: "myid",
  className: "myclass"
}, "hello", React.createElement("span", null, "yaya"));

左后编译后这样：
// 然后编译后如下：
let ele = {
    $$typeof: Symbol.for(React.element), // 表明此标签的类型
    props: {
        children: ['hello'],
        className: "myclass",
        id: "myid"
    },
    type: "h1"
}
 *
 * * */
