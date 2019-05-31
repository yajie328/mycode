// 增强dispatch  如果action是一个函数 处理以下
function createThunkMiddleware(amount){
	return ({dispatch, getState})=>next=>action=>{
		if(typeof action==='function'){
			return action(dispatch,getState, amount);
		}else{
			next(action);
		}
	}
}
const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
export default thunk;

// return function(dispatch, getState){
//     setTimeout(()=>{
//         diapatch({type: types.add})
//     },1000)
// }