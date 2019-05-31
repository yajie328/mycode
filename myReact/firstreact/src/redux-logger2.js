function logger({getState,dispatch}){
    return function(dispatch){
        return function(action){
            console.log("oldState2", getState());
            dispatch(action);
            console.log('newState2:', getState())
        }
    }
}
export default logger;