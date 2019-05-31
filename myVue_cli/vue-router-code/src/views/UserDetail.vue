<template>
    <div class="detail">
        {{$route.params.id}}
    </div>
</template>
<script>
// beforeRouteLeave beforeRouteEnter beforeRouteUpdate()
export default {
    beforeRouteUpdate(to,from,next){
        console.log(to.params)
        next();
    },
    watch:{
        $route(){ // 对路由变化作出响应...
            console.log('更新了')
        }
    },
    mounted(){
        console.log('mounted')
    }
}
</script>
