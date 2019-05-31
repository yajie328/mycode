import React, { Component } from 'react';
import withLogger from './withlogger';

class Logger extends Component{
    render(){
        console.log(this.props)
        return (
        <div>{this.props.name} logger</div>
        )
    }
}
export default  withLogger(Logger);