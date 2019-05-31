import {createStore, applyMiddleware} from '../redux'
import reducers from './reducers';
import logger from '../redux-logger'
import logger2 from '../redux-logger2'
import thunk from '../redux-thunk'
import promise from '../redux-promise.js'
// let store = createStore(reducer);

let withExtraArgumentThunk = thunk.withExtraArgument(5);
let store = applyMiddleware(withExtraArgumentThunk, promise, logger)(createStore)(reducers,0)

/* let dispatch = store.dispatch; // 缓存老状态
store.dispatch = function(action){
    console.log("oldState", store.getState());
    dispatch(action);
    console.log('newState:', store.getState())
} */
window.store = store;
export default store;

// import reducers from './reducers';
// let store = createStore(reducers,{counter1: 0, counter2: 0});