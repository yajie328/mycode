import createStore  from './createStore.js'
import bindActionCreators from './bindActionCreators.js'
import combineReducers from './combineReducers'
import applyMiddleware from './applyMiddleware'
export {
    createStore, // 创建仓库
    combineReducers,// 合并reducers
    bindActionCreators ,// 把actionCreator和dispath方法绑定在一起
    applyMiddleware // 加入中间件
}