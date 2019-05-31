import React, { Component } from 'react'
export default class Item extends Component{
    constructor(){
        super(...arguments);
    }
    render(){
        let item = this.props.data;
        
        return (
            <tr>
                <td>
                    <input 
                        type="checkbox" 
                        checked={item.selected} 
                        onChange={(e)=>{
                            this.props.setCheck(this.props.id,e.target.checked )
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
                            this.props.setLink(this.props.id, e.target.checked)
                        }}
                    />
                </td>
                <td>
                    <input 
                        type="button" 
                        value="删除" 
                        onClick={()=>{
                            this.props.remove(this.props.id);
                        }}
                    />
                </td>
            </tr>
        )
    }
}