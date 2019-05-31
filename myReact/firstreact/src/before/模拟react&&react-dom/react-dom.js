function render(element, parent){
    if(typeof element === 'string'){
        parent.appendChild(document.createTextNode(element));
        return;
    }
    let {type, props} = element;
    console.log(type);
    if(typeof type === 'function' && type.isComponent){ // 类组件 
        console.log(2);
        element = new type(props).render();
        type = element.type;
        props = element.props;
    }else if(typeof type === 'function'){ // 组件这个type是一个function
        element = type(props);
        type = element.type;
        props = element.props;
    }
    let domElement = document.createElement(type);
    for(let attr in props){
        if(attr === 'className'){
            domElement.className = props[attr];
        }else if(attr === 'style'){
            let styleObj = props.style; 
            for(let key in styleObj){
                domElement.style[key] = styleObj[key];
            }
        }else if(attr === 'children'){
            let children = Array.isArray(props.children)? props.children: [props.children];
            children.forEach(child=>render(child, domElement));
        }else{
            domElement.setAttribute(attr, props[attr]);
        }
    }
    parent.appendChild(domElement);
}
export default {render}

