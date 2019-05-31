import React from 'react'; // react核心包
import ReactDOM from 'react-dom'; //Dom 操作包

/* 获取dom 
** 1 ref       <input ref="a">
** 2 ref=函数   <input ref={refv=>this.a=refv} />
** 3 在构造函数里this.a = createRef(), <ref={this.a} /> 
//      current属性是dom元素, dom渲染完之后把do'm元素挂载到了current上
*/


class Sum1 extends React.Component{
    constructor(props){
        super(props);
    }
    add = ()=>{
        // 1. ref 是一个字符串
        // this.refs.result.value = parseInt(this.refs.a.value) + parseInt(this.refs.b.value)

        // 2. ref 是一个函数
        this.result.value = parseInt(this.a.value) + parseInt(this.b.value)

    }

    render(){
        return (
            <>
            <input ref={refv=>this.a=refv} />+<input ref={refv=>this.b=refv} /> 
            <button onClick={this.add}>=</button><input ref={refv=>this.result=refv} />
            </>
        )
    }
}
function createRef(){
    return {current:null}
}
class Sum2 extends React.Component{
    constructor(props){
        super(props);
        this.a = createRef(); 
        this.b = createRef();
        this.result = React.createRef();
    }
    add = ()=>{ // current属性是dom元素, dom渲染完之后把do'm元素挂载到了current上
        this.result.current.value = parseInt(this.a.current.value) + parseInt(this.b.current.value);
    }

    render(){
        return (
            <>
            <input ref={this.a} />+<input ref={this.b} /> 
            <button onClick={this.add}>=</button><input ref={this.result} />
            </>
        )
    }
}

ReactDOM.render(<Sum2 />, document.querySelector("#root")); 
