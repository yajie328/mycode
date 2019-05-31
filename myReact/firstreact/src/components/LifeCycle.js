import React ,{Component} from 'react'

export default class LifeCycle extends Component{
    // 静态属性
    static defaultProps = {
        name: '计算器'
    }
    constructor(props){
        super(props);
        this.state = {number:0, users:[]}; // 初始化state
        console.log('1. 初始化 props and state')
    }
    //willmount可能执行多次, 所以异步不能放在这里
    componentWillMount(){
        console.log("2. 组件将要挂载")
    }
    // didmount永远执行一次
    // 一般在此方法进行副作用，进行异步操作
    componentDidMount(){
        console.log('4. 组件挂载完成')
        fetch('https://api.github.com/users').then(res=>res.json()).then(result=>{
            console.log(result);
            this.state.users=result;
        })
    }
    shouldComponentUpdate(){
        console.log('5.询问组件是否需要更新')
        return true;
    }
    componentWillUpdate(){
        // 如果5返回true
        console.log('6. 组件将要更新')
    }
    componentDidUpdate(){
        console.log('7. 组件更新完毕')
    }
    add = ()=>{
        this.setState({number: this.state.number+1})
    }

    render(){
        console.log('3. render渲染，也就是挂载')
       return (
            <div style={{border:'1px solid red', padding: '10px'}}>
                <p>{this.props.name}  {this.state.number}</p>
                <button onClick={this.add}>点击</button>
               {this.state.number%2===0 && <SubCounter number={this.state.number} />}
               <ul>
               {
                this.state.users.map(user=>{
                    return ( <li key={user.login}>{user.login}</li>)
                })
               }
               </ul>
            </div>
        )
       }
}

class SubCounter extends Component{
    componentWillReceiveProps(){
        console.log('sub: 1 属性更新')
    }
    // 调用此方法会把新的属性对象和新的状态传过来
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.number%3 === 0){
            return true;
        }else{
            return false;
        }
    }
    componentWillUnmount(){
        console.log('sub： 组件卸载')
    }
    render(){
        return (
            <div style={{border:'1px solid green'}}>
            <p>{this.props.number}</p>
            </div>
        )
    }
}