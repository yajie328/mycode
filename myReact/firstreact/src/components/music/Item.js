import React, { Component } from 'react'
import ThemeContext from './globalContext';

export default class Item extends Component{
    static contextType = ThemeContext;
    
    render(){
        let item = this.props.data;
        return (
            <tr>
                <td>
                    <input 
                        type="checkbox" 
                        checked={item.selected} 
                        onChange={(e)=>{
                            this.context.setCheck(this.props.id,e.target.checked )
                        }}
                    />
                </td>
                <td>{item.title}</td>
                <td>{item.singer}</td>
                <td>
                    <input 
                        type="checkbox" 
                        checked={item.link} 
                        onChange={(e)=>{
                            this.context.setLink(this.props.id, e.target.checked)
                        }}
                    />
                </td>
                <td>
                    <input 
                        type="button" 
                        value="删除" 
                        onClick={()=>{
                            this.context.remove(this.props.id);
                        }}
                    />
                </td>
            </tr>
        )
    }
}