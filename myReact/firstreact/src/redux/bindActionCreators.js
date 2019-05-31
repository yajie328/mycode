function bindActionCreator(action, dispatch){
    return function (){
        return dispatch(action.apply(this,arguments))
    }
}
function bindActionCreators(actions, dispatch){
    if(typeof actions ==='function'){
        return bindActionCreator(actions, dispatch)
    }
    const newObj = {};
    for (const key in actions){
        newObj[key] = bindActionCreator(actions[key], dispatch)
    }
    return newObj;
}

export default bindActionCreators;