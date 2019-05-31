import * as types from  '../action-types';

export default function reducer(state=0, action) {
	switch (action.type) {
	  case types.add2:
		return state + 1
	  case types.minus2:
		return state - 1
	  default:
		return state
	}
	
}