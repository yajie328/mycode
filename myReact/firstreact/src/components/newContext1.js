import React, { Component } from 'react';
import PropTypes from 'prop-types';
const ThemeContext = React.createContext(); // 返回对象
var REACT_CONTEXT_TYPE =  Symbol.for('react.context') ;
var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
// const ThemeContext = createContext();
// {Privider, Consumer}

function createContext(){
    class Provider extends Component {
        static value;
        $$typeof = REACT_PROVIDER_TYPE;
        constructor(props){
            super(props);
            Provider.value = props.value;
            this.state = {value:props.value}
        }
        static getDerivedStateFromProps(props,state){
            Provider.value = props.value;
            return {value: props.props}
        }
        render(){
            return this.props.children;
        }
    }
    class Consumer extends Component{
        render(){
            return this.props.children(Provider.value);
        }
    }
    return {$$typeof: REACT_CONTEXT_TYPE, Provider, Consumer}
}
export default class Context extends Component{
    constructor(){
        super()
        this.state = {color: "gray"}
    }
    setColor = (color)=>{
        this.setState({color})
    }
    render(){
        let ctx = {color:this.state.color, setColor:this.setColor}
        return (
        <ThemeContext.Provider value={ctx}>
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
        </ThemeContext.Provider>
        )
    }
}

class Header extends Component {
    render(){
        return (
            <div style={{border:'3px solid blue', padding:'5px'}}>
                Header
                <Title></Title>
            </div>
        
        )
    }
}
class Title1 extends Component {
    static contextType =  ThemeContext;
    render(){
        this.context = Title.contextType.Provider.value;
        return (
            <div style={{border:'3px solid orange', padding:'5px', color: this.context.color}}>
                Title  
            </div>
        
        )
    }
}
function Title(props) {
    return (
        <ThemeContext.Consumer>
            {
                value=>(
                    <div style={{border:'3px solid orange', padding:'5px', color: value.color}}>
                        Title  
                    </div>
                )
            }
        </ThemeContext.Consumer>
    )
    
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
    static contextType =  ThemeContext;
    render(){
        // this.context = Content.contextType.Provider.value;
        // console.log(this.context)
        return (
            <div style={{border:'3px solid gray', padding:'5px',color: this.context.color}}>
                Content
                <button onClick={()=>this.context.setColor('red')}>变红</button>
                <button onClick={()=>this.context.setColor('green')}>变绿</button>
            </div>
        )
    }
}
/* function Content(props){
    return (
        <ThemeContext.Consumer>

        {
            value =>(
                <div style={{border:'3px solid gray', padding:'5px',color: value.color}}>
                    Content
                    <button onClick={()=>value.setColor('red')}>变红</button>
                    <button onClick={()=>value.setColor('green')}>变绿</button>
                </div>
            )
        }
        </ThemeContext.Consumer>
    )
} */