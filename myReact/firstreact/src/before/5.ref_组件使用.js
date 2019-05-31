import React from 'react'; // react核心包
import ReactDOM from 'react-dom'; //Dom 操作包

/* 在组件上使用ref
*/


class Form extends React.Component{
    constructor(props){
        super(props);
        this.textInput = React.createRef();
    }
    focus = ()=>{
        // console.log(this.textInput.current); // 子组件的实例
        // console.log(this.textInput.current.textInput.current) // 子组件实例上的dom
        // this.textInput.current.textInput.current.focus();
        this.textInput.current.focus();
    }

    render(){
        // 在组建上挂ref 那么textInput就是组件的实例
        return (
            <>
            <TextInput3 ref={this.textInput}/>  
            <button onClick={this.focus}>focus</button>
            </>
        )
    }
}

class TextInput extends React.Component{
    constructor(props){
        super(props);
        this.textInput = React.createRef();
    }
    render(){
        return <input ref={this.textInput}/>
    }
}

function TextInput2(props, ref){
    return <input ref={ref} />
}
let TextInput3 = React.forwardRef(TextInput2);

ReactDOM.render(<Form />, document.querySelector("#root")); 
