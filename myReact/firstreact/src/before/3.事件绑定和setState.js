import React from 'react'; // react核心包
import ReactDOM from 'react-dom'; //Dom 操作包

/**
 * 把add 方法this里指针绑定为组件实例
 * 1. this.add.bind(this)
 * 2. ()=>{this.add()}    使用匿名函数
 * 3. 类的属性
 *
 */
class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {num:0,name:2}
    }
    // 给类的实例增加一个add属性， 而这个属性里的this绑死为组件的实例
    add = ()=>{
        // this.setState({num: this.state.num+1});

        // this.state.num++;
        // this.forceUpdate(); // 强制刷新界面

        /* this.setState({num: this.state.num+1});
        console.log(this.state.num); //0
        this.setState({num: this.state.num+1});
        console.log(this.state.num); //0 */

        /* 参数是上一次的state
        *  setState是异步的
        *  setState(obj, callback) 不会覆盖其他的属性
        *  setState是把obj都执行完了在执行callback
        */
        this.setState((state)=>{ 
            return {number:state.num++};
        },()=>{
            console.log(this.state.num); //2
        })
        this.setState((state)=>{
            return {number:state.num++};
        },()=>{
            console.log(this.state.num); //2
        })
    }
    minis=()=>{
        console.log(1);
    }

    render(){
        console.log(this);
        return (
            <>
            {this.state.num}
            <div><button onClick={this.add}>+</button></div>
            </>
        )
    }
}

ReactDOM.render(<Clock />, document.querySelector("#root")); 
