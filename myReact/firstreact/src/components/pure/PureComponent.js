import React, { Component } from 'react';

export default class PureComponent extends Component{
    isPureComponet = true;
    // 传入新的属性和状态对象，然后返回一个是否需要根棍的boolean值
    shouldComponentUpdate(nextProps, nextState){
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }
}
// 浅比较  如果obj1==obj2 返回true 只比较第一层
function shallowEqual(obj1, obj2){
    if(obj1 === obj2){
        return true;
    }
    if(typeof obj1 != 'object' || obj1 === null || typeof obj2 != 'object' || obj2 === null ){
        return false;
    }
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    if(keys1.length !== keys2.length){
        return false;
    }
    for(let key of keys1){
        if(!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]){
            return false;
        }
        
        // 深比较
        /* if(obj2.hasOwnProperty(key)){
            if(typeof obj1[key] === 'object' && typeof obj2[key] === 'object'){
                return shallowEqual(obj1[key], obj2[key]);
            }
        }else{
            return false;
        } */
    }
    return true;
}
