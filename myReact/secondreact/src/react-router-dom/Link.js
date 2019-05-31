import React, { Component } from 'react';
import RouterContext from './context'
export default class Link extends Component{
    static contextType =  RouterContext;
    render(){
        return <a {...this.props} onClick={()=>this.context.history.push(this.props.to)}>{this.props.children}</a>
    }
}

//<a href={`#${this.props.to}`}>{this.props.children}</a>