import React, { Component ,PureComponent } from 'react';
// import PureComponent from './PureComponent'

// 实现自己的memo
function memo(FuncComponent){
    return class  extends PureComponent{
        render(){
            // return <FuncComponent {...this.props} /> // 1 
            return FuncComponent(this.props) // 2
        }
    }
}
class Title1 extends PureComponent{
    render(){
        console.log('title render')
        return <div>{this.props.title}</div>
    }
}
// 如果是函数组件如何保证不更改就不渲染呢？  使用React.memo(组件名)
function Title(props){
    console.log('title render')
    return <div>{props.title}</div>
}
Title = memo(Title);

class Counter extends PureComponent{
    render(){
        console.log('counter render')
        return <div>{this.props.number}</div>
    }
}
export default class App extends PureComponent{
    constructor(props){
        super(props);
        this.props = props;
        this.state = {title:'计数器', number:0}
        this.inputRef = React.createRef();
    }
    add =()=>{
        this.setState({
            number: this.state.number + parseInt(this.inputRef.current.value) 
        })
    }
    render(){
        console.log('app render')
        return(
            <div>
                <Title title={this.state.title}></Title>
                <Counter number={this.state.number}></Counter>
                <input type="text" ref={this.inputRef}/>
                <button onClick={this.add}>+</button>
            </div>
        )
    }
}



