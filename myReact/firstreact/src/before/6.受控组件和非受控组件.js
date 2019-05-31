import React from 'react'; // react核心包
import ReactDOM from 'react-dom'; //Dom 操作包
// 受控组件指dom元素的值受React状态控制
// 非受控组件
class Form extends React.Component{
    constructor(props){
        super(props);
    }
    show = ()=>{
        console.log(this.input.value);
    }

    render(){
        // 在组建上挂ref 那么textInput就是组件的实例
        return (
            <>
            <input ref={dom=>this.input=dom} />
            <button onClick={this.show}>printValue</button>
            </>
        )
    }
}

// 受控组件
class Form1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {text:'hello'}
    }
    show = ()=>{
        console.log(this.state.text);
    }
    change = (event)=>{
        this.setState({text:event.target.value});
    }

    render(){
        // 在组建上挂ref 那么textInput就是组件的实例
        /*<input defaultValue={this.state.text} />*/
        return (
            <>
            <input value={this.state.text} onChange={this.change} />
            <button onClick={this.show}>printValue</button>
            </>
        )
    }
}


ReactDOM.render(<Form1 />, document.querySelector("#root")); 
