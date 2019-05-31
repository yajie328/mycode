import * as types from "../action-types"

export default {
	add(value){
		// store.dispatch({type:'add'})
		return {type: types.add, payload:value}
	},
	minus(){
		// store.dispatch({type:'minus'})
		return {type:types.minus}
	},
	// 延迟1s执行， 借助think中间件
	asyncAdd(){
		return function(dispatch, getState, amount){
			setTimeout(()=>{
				dispatch({type: types.add, payload:amount})
			},1000)
		}
	},
	promiseAdd(){
		return {
			type: types.add,
			payload: new Promise(function(resolve, reject){
				setTimeout(()=>{
					let num = Math.random();
					if(num>.5){
						resolve(num);
					}else{
						reject(num);
					}

				},1000)
			})
		}
	}

}