import React, { Component } from 'react';
import RouterContext from './context';
import pathToRegexp from 'path-to-regexp';
export default class Route extends Component{
    static contextType = RouterContext
    render(){
        let {pathname} = this.context.location;
        let {path='/', component:Com, exact=false} = this.props;
        let paramNames = [];
        let regexp = pathToRegexp(path,paramNames, {end:exact})
        let result = pathname.match(regexp);
        let props = {
            location: this.context.location
        }
        if(result){
            return <Com {...props} />
        }else{
            return null;
        }
    }
}
