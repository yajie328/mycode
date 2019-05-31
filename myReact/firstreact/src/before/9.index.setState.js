// batchingStrategy.isBatchingUpdates
// batchedUpdates
let betchingStrategy ={
    isBatchingUpdates: false, // 默认不批量更新
    dirtyComponent:[], //脏组件 状态和显示不一样
    batchedUpdates(queueUpdate, component){
        this.dirtyComponent.forEach(component=>component.updateComponent())
    }
}
// 更新器
class Updater{
    constructor(component){
        this.component = component;
        this.pendingStatus = [];
    }
    addState(particalState){
        this.pendingStatus.push(particalState);
        betchingStrategy.isBatchingUpdates? 
        betchingStrategy.dirtyComponent.push(this.component)
        : this.component.updateComponent();
    }
}
// 父组件
class Component{
    constructor(props){
        this.props =  props;
        this.$updater = new Updater(this);
    }
    createDomFromString(str){
        let oDiv = document.createElement('div');
        oDiv.innerHTML = str;
        return oDiv.children[0]
    }
    setState(particalState){
        this.$updater.addState(particalState);
        
    }
    updateComponent(){
        this.$updater.pendingStatus.forEach(particalState=>Object.assign(this.state, particalState));
        this.$updater.pendingStatus.length = 0;
        let oldDom = this.domElement;
        let newDom = this.renderElement();
        oldDom.parentElement.replaceChild(newDom, oldDom);
    }
    renderElement(){
        let htmlStr = this.render();
        this.domElement = this.createDomFromString(htmlStr);
        // 把实例赋值到dom的属性上进行关联
        this.domElement.component = this;
        return this.domElement;
    }
    mount(container){
        container.appendChild(this.renderElement())
    }
}
window.trigger =  function(event, method){
    betchingStrategy.isBatchingUpdates = true; // 开启批量更新模式
    let component = event.target.component;
    component[method].call(component, event);
    betchingStrategy.isBatchingUpdates = false;
    betchingStrategy.batchedUpdates(); //进行批量更新
}
// 子组件
class Counter extends Component{
    constructor(props){
        super(props);
        this.state = {num:0}
    }
   
    add(event){
      this.setState({num:this.state.num+1});
      console.log(this.state);
      this.setState({num:this.state.num+1});
      console.log(this.state);
      setTimeout(()=>{
        this.setState({num:this.state.num+1});
        console.log(this.state);
        this.setState({num:this.state.num+1});
        console.log(this.state);
      })
    }
    render(){
        return `<button onclick="trigger(event, 'add')">${this.state.num}${this.props.name}</button>`;
    }
    
}