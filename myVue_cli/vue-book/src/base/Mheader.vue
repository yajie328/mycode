<template>
    <div class="header">
        <slot></slot>
        <span><i class="iconfont icon-fanhui" v-if="back" @click="goBack"></i></span>
    </div>
</template>
<script>
export default {
    props:{
        back:{
            type: Boolean,
            default: false
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="less" scoped>
.header{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:40px;
    text-align: center;
    line-height: 40px;
    background-color:turquoise;
    font-weight: bold;
    span{
        position: absolute;
        left:20px;
        cursor: pointer;
        width:50px;
    }
}
</style>


