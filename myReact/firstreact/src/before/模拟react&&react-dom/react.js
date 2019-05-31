const REACT_ELEMENT_TYPE = Symbol.for('react.element') || 0xeac7;

function ReactElement(type, props){
   const element = {
        $$typeof: REACT_ELEMENT_TYPE,
        type, 
        props,
        ref: null
    }
    return element;
}
function createElement(type, config, children){
    let props = {};
    for(let attr in config){
        props[attr] = config[attr];
    }
    let childrenLength = arguments.length-2;
    if(childrenLength === 1){
        props.children = children;
    }else{
        children = Array.from(arguments).slice(2);
        props.children = children;
    }
    
    return ReactElement(type, props);
    
}

class Component {
    static isComponent = true;
    constructor(props){
        this.props = props;
    }
}

export default {createElement, Component}

// 目标对象
/* {
    $$typeof: Symbol.for(React.element), // 表明此标签的类型
    props: {
        children: ['hello'],
        className: "myclass",
        id: "myid"
    },
    type: "h1" // 普通dom
    type: function() // 组件 函数
    type: class function(){}, // 类组建 有一个isComponent 属性
} */