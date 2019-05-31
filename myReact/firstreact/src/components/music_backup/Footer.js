import React, { Component } from 'react'

export default class Header extends Component{
    
    render(){
        let length = this.props.length;
        let selectLength = this.props.selectLength;
        let listState = this.props.listState;
        let linkLength = this.props.linkLength;
        return (
            <footer style={{display:this.props.length? "block": "none"}}>
                <div>
                    <span className="">共{length}首歌曲</span>
                    <span 
                        className="fr" 
                        style={{display:selectLength? "block": "none"}}
                    >
                        当前选中{this.props.selectLength}首歌曲
                    </span>
                </div>
                <div>
                    <button 
                        style={{display: selectLength?'inline-block': "none"}}
                        onClick={()=>{
                            this.props.removeSelect();
                        }}
                    >
                        删除选中歌曲
                    </button>
                    <button
                        style={{display: selectLength?'inline-block': "none"}}
                        onClick ={()=>{
                            this.props.linkSelect()
                        }}
                    >
                        收藏选中歌曲
                    </button>
                    <button
                        style={{display: selectLength?'inline-block': "none"}}
                        onClick={()=>{
                            this.props.cancelLinkSelect();
                        }}
                    >
                        取消收藏选中歌曲
                    </button>
                    <button
                        style={{display: (listState && linkLength)?'inline-block': "none"}}
                        onClick = {()=>{
                            this.props.showLinkState(false)
                        }}
                    >
                        查看收藏歌曲
                    </button>
                    <button
                        style={{display: !listState?'inline-block': "none"}}
                        onClick = {()=>{
                            this.props.showLinkState(true)
                        }}
                    >
                        查看全部歌曲
                    </button>
                </div>
            </footer>
        )
    }
}