import React, { Component } from 'react';

export default class Counter extends Component{
    constructor(props){
        super(props);
        this.state = {number:0}
    }
    add = ()=>{
        this.setState({number: this.state.number+1})
    }
    render(){
        return(
            <div>
                <p>{this.state.number}</p>
                <button onClick={this.add}>+</button>
                <SubCounter number={this.state.number} />
            </div>
        )
    }
    
}

class SubCounter extends Component{
    constructor(){
        super();
        this.state = {number:0}
    }
    // 根据新的属性对象派生状态对象  
    //参数： 新的属性对象，旧的状态对象
    static getDerivedStateFromProps(nextProps, prevState){
        // return {date:Date.now()}
        console.log(nextProps, prevState);
        if(nextProps.number%2 ===0){
            return {number:nextProps.number*2}
        }else{
            return {number:nextProps.number*3}
        }
    }
    render(){
        return(
            <div>
                {this.state.number} {this.state.date}
            </div>
        )
    }
}