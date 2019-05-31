import React from 'react'; // react核心包
import ReactDOM from 'react-dom'; //Dom 操作包

// 数据流是向下传递的
class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {text: 1, name:'daya'}
    }
    change = (event)=>{
        this.setState({text: event.target.value})
    }
    render(){
        return (
            <>
            <input defaultValue={this.state.text} onChange={this.change}/>
            <Son text={this.state.text} name={this.state.name}/>
            </>
        )
    }
}
class Son extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div>text: {this.props.text} name: {this.props.name}</div>
    }
}



ReactDOM.render(<Form />, document.querySelector("#root")); 
