import React, { Component } from 'react';
import PropTypes from 'prop-types';
// react上下文

export default class Page extends Component {
    constructor(){
        super()
        this.state = {color: "gray"}
    }
    // 定义子上下文对象的属性和类型
    static childContextTypes = {
        name: PropTypes.string,
        color: PropTypes.string,
        setColor: PropTypes.func
    }
    // 返回或者说定义真正的上下文
    getChildContext(){
        return {
            name: 'Page',
            color: this.state.color,
            setColor: this.setColor
        }
    }
    setColor = (color)=>{
        this.setState({color})
    }
    render(){
        return (
        <div style={{border:'1px solid red', padding:'5px'}}>
            Page
            <Header>
                <Title>
                    
                </Title>
            </Header>
            <Main>
                <Content>
                    
                </Content>
            </Main>
        </div>
        )
    }
}

class Header extends Component {
    static childContextTypes = {
        name: PropTypes.string,
        age: PropTypes.number
    }
    getChildContext(){
        return {
            age: 10,
            name: 'Header'
        }
    }
    render(){
        return (
            <div style={{border:'3px solid blue', padding:'5px'}}>
                Header
                <Title></Title>
            </div>
        
        )
    }
}
class Title extends Component {
    // 指定我要获取哪些上下文对象， 可以少但不能多
    static contextTypes = {
        color: PropTypes.string,
        name: PropTypes.string,
        age: PropTypes.number,
        setColor: PropTypes.func
    }
  
    render(){
        console.log(this.context)
        return (
            <div style={{border:'3px solid orange', padding:'5px', color: this.context.color}}>
                Title  
                name={this.context.name}    
               color= {this.context.color}   
                age={this.context.age}
            </div>
        
        )
    }
}
class Main extends Component {
    render(){
        return (
            <div style={{border:'3px solid yellow', padding:'5px'}}>
                Main
                <Content></Content>
            </div>
        )
    }
}
class Content extends Component {
    static contextTypes={
        color: PropTypes.string,
        setColor: PropTypes.func
    }
    render(){
        console.log(this.context)
        return (
            <div style={{border:'3px solid gray', padding:'5px',color: this.context.color}}>
                Content
                <button onClick={()=>this.context.setColor('red')}>变红</button>
                <button onClick={()=>this.context.setColor('green')}>变绿</button>
            </div>
        )
    }
}