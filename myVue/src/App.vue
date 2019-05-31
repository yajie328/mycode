<template>
    <div>
        {{msg}}
        <button @click='show'>notify</button>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return {msg:'hello'}
    },
    methods:{
        show(){
            this.$notify('我很美', {delay:1000});
        }
    }
}
</script>
<style lang="less">
.color{color: red;}
</style>



