import React from 'react'; // react核心包
import ReactDOM from 'react-dom'; //Dom 操作包

class Clock extends React.Component{
    constructor(props){
        super(props);
        // 构造函数里唯一可以给state直接赋值的地方
        this.state = {date:new Date().toLocaleTimeString()}
    }
    
    componentDidMount(){
        this.$timer = setInterval(()=>{
            this.setState({date: new Date().toLocaleTimeString()});
        },1000)
    }

    render(){
        return (
                <div>时间：{this.state.date}</div>
        )
    }
}

ReactDOM.render(<Clock />, document.querySelector("#root")); 
