// 中间件写法 store dispatch action
/* let logger = store=>dispatch=>action=>{
	console.log("oldState", store.getState());
	dispatch(action);
	console.log('newState:', store.getState())
} */
function logger({getState,dispatch}){
	return function(dispatch){
		return function(action){
			console.log("oldState", getState());
			dispatch(action);
			console.log('newState:', getState())
		}
	}
}
export default logger;
