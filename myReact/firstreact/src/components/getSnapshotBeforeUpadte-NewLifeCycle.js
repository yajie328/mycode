import React, { Component } from 'react';
// 更新前快照
export default class getSnapshotBeforeUpdate extends Component{
    constructor(props){
        super(props);
        this.wrapper = React.createRef();
        this.state = {messages:[]}
    }
    componentDidMount(){
        setInterval(()=>{
            this.setState({messages:[this.state.messages.length, ...this.state.messages]})
        },1000)
    }
    getSnapshotBeforeUpdate(){
        // 返回更新内容的高度 
        return this.wrapper.current.scrollHeight;
    }
    // 组件更新完毕
    componentDidUpdate(prevProps, prevState, prevScrollHeight){
        this.wrapper.current.scrollTop =  this.wrapper.current.scrollTop + (this.wrapper.current.scrollHeight-prevScrollHeight)
    }
    render(){
        let style = {
            height:'100px',
            width: '200px',
            border:'1px solid red',
            overflow:'auto'
        }
        return(
            <ul style={style} ref={this.wrapper}>
            {
                this.state.messages.map((message,index)=><li key={index}>{message}</li>)
            }
            </ul>
        )
    }
    
}

