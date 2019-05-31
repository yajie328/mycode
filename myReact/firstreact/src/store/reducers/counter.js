import * as types from  '../action-types';
let initState = {num:0}
export default function reducer(state= initState, action) {
	switch (action.type) {
		case types.add:
		return {num: action.payload? action.payload+1: state.num+1}
		case types.minus:
		return {num: state.num-1}
		default:
		return state
	}
	
}