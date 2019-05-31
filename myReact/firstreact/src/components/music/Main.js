import React, { Component } from 'react'
import Item from './Item'
import ThemeContext from './globalContext';
export default class Main extends Component{
    static contextType = ThemeContext;
    render(){
        return (
            <div style={ {display: this.context.data.length? "block": "none" } }>
                <table className="table">
                    <thead>
                        <tr>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={this.context.isCheckAll}
                                    onChange={(e)=>{
                                        this.context.setCheckAll(e.target.checked)
                                    }}
                                /> 全选
                            </td>
                            <td>歌曲</td>
                            <td>歌手</td>
                            <td>收藏</td>
                            <td>删除</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.context.data.map((item,index)=>{
                                return (
                                    <Item 
                                        key={index}
                                        data={item}
                                        id={item.id}
                                        index={index}
                                    /> 
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            
        )
    }
}