import React, { Component } from 'react';
import RouterContext from './context';
export default class Redirect extends Component{
    static contextType = RouterContext
    render(){
        console.log(this.props.to, 2)
       this.context.history.push(this.props.to)
       return null;
    }
}
