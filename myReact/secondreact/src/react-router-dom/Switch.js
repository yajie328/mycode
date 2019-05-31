import React, { Component } from 'react';
import RouterContext from './context';
import pathToRegexp from 'path-to-regexp';
export default class Route extends Component{
    static contextType = RouterContext;
    render(){
        console.log(this.context)
        let {pathname} = this.context.location;
        let children = Array.isArray(this.props.children)? this.props.children: [this.props.children];
        for(let i=0; i<children.length; i++){
            let child = children[i];
            let {path="/", exact=false} = child.props;
            let paramNames = [];
            let regexp = pathToRegexp(path, paramNames,{end:exact});
            let result = pathname.match(regexp);
            if(result){
                console.log(1,path,child)
                return child
            }
        }
       return null
    }
}
