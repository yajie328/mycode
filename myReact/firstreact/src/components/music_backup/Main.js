import React, { Component } from 'react'
import Item from './Item'
export default class Header extends Component{
    render(){
        return (
            <div style={ {display: this.props.data.length? "block": "none" } }>
                <table className="table">
                    <thead>
                        <tr>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={this.props.isCheckAll}
                                    onChange={(e)=>{
                                        this.props.setCheckAll(e.target.checked)
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
                            this.props.data.map((item,index)=>{
                                return (
                                    <Item 
                                        key={index}
                                        data={item}
                                        id={item.id}
                                        index={index}
                                        setCheck={this.props.setCheck}
                                        setLink={this.props.setLink}
                                        remove ={this.props.remove}
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