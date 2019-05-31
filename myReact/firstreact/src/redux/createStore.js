import isPlainObject from './utils/isPlainObject.js';
import ActionTypes from './utils/actionTypes.js'

export default function createStore(reductor, preloadedState){
    if(typeof reductor != 'function'){
        throw new Error('reductor 必须是一个函数')
    }
    let currentState = preloadedState;
    let currentReductor = reductor;
    let currentListeners = []; // 定义一个数组保存监听函数

    // 返回当前状态
    function getState(){
        return currentState;
    }

    function dispatch(action){
        if(!isPlainObject(action)){
            throw new Error('action必须是一个纯对象')
        }
        if(typeof action.type === 'undefined'){
            throw new Error('action的type属性不能是undefined')
        }

        currentState = currentReductor(currentState, action);
        currentListeners.forEach(currentListener=>currentListener())
        return action;
    }
    function subscribe(listener){
        let subscribed = true;
        currentListeners.push(listener);
        // 返回取消订阅
        return function unsubscribe(){
            if(!subscribed) return;
            currentListeners = currentListeners.filter(l=> l !== listener)
            subscribed = false;
        }
    }
    dispatch({type: ActionTypes.INIT})
    return {
        dispatch,
        getState,
        subscribe
    }
}