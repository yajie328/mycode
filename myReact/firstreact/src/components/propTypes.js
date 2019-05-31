import React, { Component } from 'react';
import PropTypes from 'prop-types';
// 属性类型
/* let props = {
    name: 'daya', // 字符串 必填
    age: 18, // 数字 必填而且布恩小于18岁
    gender:'女', //只能时男或女
    isMarried: true, // 是否已婚
    hobby:['smoking', 'drinking'], // 字符串数组
    position: {x:100, y:100} // 拥有x y 属性对象
} */
export default class Person extends Component {
    static defaultProps = {
        isMarried: false
    }
    static stateTypes = {

    }
    static propTypes = {
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        gender: PropTypes.oneOf(['男','女']),
        isMarried: PropTypes.bool,
        hobby: PropTypes.arrayOf(PropTypes.string),
        position: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        }),
        age(props, propName,componentName){
            if(props[propName]<18){
                return new Error(`Invalid Prop ${propName}, supplied to ${componentName}`)
            }
        }
    }
    render(){
        return (
            <div>
            {this.props.name}
            </div>
        )
    }
}