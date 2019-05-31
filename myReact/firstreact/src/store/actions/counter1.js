import * as types from "../action-types"

export default {
    add(value){
        // store.dispatch({type:'add'})
        return {type: types.add1, payload:value}
    },
    minus(){
        // store.dispatch({type:'minus'})
        return {type:types.minus1}
    }
}