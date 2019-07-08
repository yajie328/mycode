<template>
<div>
    Bar<br>
     {{$store.state.username}}
    <button @click="show">点我弹框</button>
</div>
</template>
<script>
export default {
     // 写的代码 都是异步的 全部采用promise
    // 规定只有页面级组件才能使用
    asyncData({store}){ // 异步数据 这个方法只在服务端执行，客户端运行是不会执行的
        return store.dispatch('set_username');
    },
    mounted(){
        setTimeout(()=>{
            this.$bus.$emit('dinner','晚餐不吃了');
        },2000)
        this.$bus.$on('dinner',(data)=>{
             console.log(data)
        })
        this.$store.dispatch('set_username');
    },
    methods:{
        show(){
            alert(1);
        }
    }
}
</script>

