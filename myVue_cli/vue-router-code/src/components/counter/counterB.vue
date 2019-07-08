<template>
    <div>
        {{this.$store.state.num}}
        <el-button @click="minus">过2秒减10</el-button>
    </div>
</template>
<script>
import {mapActions} from 'vuex';

export default {
    methods:{
        ...mapActions(['minusNum']),
        minus(){
            // this.$store.dispatch('minusNum', 10)
            this.minusNum(10);
        }
    }
}
</script>

