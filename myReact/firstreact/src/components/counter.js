import React, { Component } from 'react';
import actions from "../store/actions/counter"
import {connect} from '../react-redux';
class Counter extends Component{
	render(){
		return (
			<>
			<p>{this.props.num}</p>
			<button onClick={this.props.add}>+</button>
			<button onClick={this.props.minus}>-</button>
			<button onClick={this.props.asyncAdd}>延迟1s加1</button>
			<button onClick={this.props.promiseAdd}>promise加1</button>
			</>
		)
	}
}
// {number:0}=>{number:0} 将成为组件的属性对象
const mapStateToProps = state=>state;
const mapDisPatchToProps = (dispatch)=>{
	return {
		add: (...args)=> dispatch(actions.add(...args)),
		minus: (...args)=>dispatch(actions.minus(...args))
	}
}
// mapDisPatchToProps
// connect 负责链接仓库和组件
export default connect(
	mapStateToProps,
	actions
)(Counter)