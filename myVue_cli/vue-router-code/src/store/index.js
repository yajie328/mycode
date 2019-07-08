import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {          // data
        num:1,
        a:{
            a: 'a'
        }
    },
    mutations:{       // methods
        addNum(state, dis){
            state.num += dis
        }
    },
    getters:{         // computed
        multi(state){
            return state.num%3 === 0? '能整除3':'不能整除3'
        }
    },
    actions:{         // async methods
        minusNum(context,dis){
            setTimeout(()=>{
                context.commit('addNum', dis*-1)
            },2000)
        }
    }
    
})