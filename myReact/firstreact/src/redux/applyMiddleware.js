import compose from "./compose"
export default function applyMiddleware(...middlewares){ // [think, logger]
    return function(createStore){
        return function(reducer){
            let store = createStore(reducer); // 最原始的仓库
            let dispatch = ()=>{throw Error('现在还不能用')}
            let middleAPI = {
                getState: store.getState,
                dispatch: (...args)=> dispatch(...args)
            }
            const chain  = middlewares.map(middleware=>middleware(middleAPI))
            // middleware = middleware(store);
            // dispatch = middleware(store.dispatch);
            dispatch = compose(...chain)(store.dispatch);
            return {
                ...store,
                dispatch
            };
        }
    }
}