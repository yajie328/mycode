import React, { Component } from 'react'
import ThemeContext from './globalContext';

export default class Header extends Component{
    static contextType = ThemeContext;
    
    render(){
        let length = this.context.length;
        let selectLength = this.context.selectLength;
        let listState = this.context.listState;
        let linkLength = this.context.linkLength;
        return (
            <footer style={{display:length? "block": "none"}}>
                <div>
                    <span className="">共{length}首歌曲</span>
                    <span 
                        className="fr" 
                        style={{display:selectLength? "block": "none"}}
                    >
                        当前选中{selectLength}首歌曲
                    </span>
                </div>
                <div>
                    <button 
                        style={{display: selectLength?'inline-block': "none"}}
                        onClick={()=>{
                            this.context.removeSelect();
                        }}
                    >
                        删除选中歌曲
                    </button>
                    <button
                        style={{display: selectLength?'inline-block': "none"}}
                        onClick ={()=>{
                            this.context.linkSelect()
                        }}
                    >
                        收藏选中歌曲
                    </button>
                    <button
                        style={{display: selectLength?'inline-block': "none"}}
                        onClick={()=>{
                            this.context.cancelLinkSelect();
                        }}
                    >
                        取消收藏选中歌曲
                    </button>
                    <button
                        style={{display: (listState && linkLength)?'inline-block': "none"}}
                        onClick = {()=>{
                            this.context.showLinkState(false)
                        }}
                    >
                        查看收藏歌曲
                    </button>
                    <button
                        style={{display: !listState?'inline-block': "none"}}
                        onClick = {()=>{
                            this.context.showLinkState(true)
                        }}
                    >
                        查看全部歌曲
                    </button>
                </div>
            </footer>
        )
    }
}