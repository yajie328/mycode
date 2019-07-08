<template>
    <div>
        {{n}}<br>
        {{this.$store.state.num}}
        {{a}}
        <el-button @click="add">点击</el-button>
        <el-button @click="addNum(10)">点击</el-button>
        {{this.$store.getters.multi}}
        {{multi}}

    </div>
</template>
<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
console.log(mapState(['count']));
console.log(mapMutations(['addNum']))
export default {
   /*  data(){
        return {
            num: this.$store.state.num
        }
    }, */
    computed:{
        ...mapGetters(['multi']),
        // mapState更改名字用对象 如果不用更改名用数组即可
        ...mapState({a: state=>state.a.a}), // 函数
        ...mapState({n: 'num'})
        // ...mapState(['num']) // 和下面等价
        /* num(){
            return this.$store.state.num
        } */
    },
    methods:{
        ...mapMutations(['addNum']),
        add(){
            this.$store.commit('addNum', 10)
        }
    }
}
</script>

