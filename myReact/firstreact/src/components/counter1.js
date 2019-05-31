import React, { Component } from 'react';
import {bindActionCreators} from '../redux'
import store from '../store'
import actions from "../store/actions/counter1"
let boundActions = bindActionCreators(actions, store.dispatch)


export default class Counter extends Component{
    state = {num: store.getState().counter1} 
    componentDidMount(){
        // 挂载完成订阅
        this.unsubscribe = store.subscribe(()=>{
            this.setState({num: store.getState().counter1})
        })
    }
    componentWillUnmount(){// 组件移除取消订阅
        this.unsubscribe();
    }
    render(){
        return (
            <>
            <p>{this.state.num}</p>
            <button onClick={boundActions.add}>+</button>
            <button onClick={boundActions.minus}>-</button>
            </>
        )
    }
}