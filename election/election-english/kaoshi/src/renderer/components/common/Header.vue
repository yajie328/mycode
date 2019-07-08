<template>
<header>
    <nav>
        <router-link to="/profile/report">报告</router-link>
        <router-link to="/profile/info">个人信息</router-link> 
        <span>你好，张三老师</span> <router-link to="/login">退出</router-link>
    </nav>
</header>
</template>
<script>
export default {
    data(){
       return {

       }
    }
}
</script>

<style scoped>
header{
    height:50px;
    line-height:50px;
    align-items: center;
    background:#b8daff;
    border-bottom:1px solid #ddd;
    padding-right:30px;
}

nav{
   float:right;
}
nav:nth-child(n){
    -webkit-app-region: no-drag;
}
</style>

