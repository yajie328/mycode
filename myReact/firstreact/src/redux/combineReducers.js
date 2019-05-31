export default function combineReducers(reducers){
    const reducerKeys = Object.keys(reducers); // ['counter1','counter2]
    return function(state={}, action){
        const newState = {} // 下一个状态对象
        for(let i=0; i<reducerKeys.length; i++){
            const key = reducerKeys[i];
            const reducer = reducers[key];
            const preStateForKey = state[key];
            const newStateForKey = reducer(preStateForKey, action);
            newState[key] = newStateForKey;
        }
        return newState;
    }
}