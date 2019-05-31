<template>
   <el-container>
       <el-aside width="200px">
           <el-menu
            :router="true"
            :default-active="$route.path"
           >
                <el-menu-item index="/user/add">用户添加</el-menu-item>
                <el-menu-item index="/user/list">用户列表</el-menu-item>
                <li>
                    <router-link  :to="{ path:'/user/detail'}" active-class="exact-active">用户详情</router-link>
                </li>
                <li><router-link :to="{ path: 'info'}" append>append</router-link></li>
           </el-menu>
       </el-aside>
       <el-main>
             <router-view v-title="$route.meta.title"></router-view>
       </el-main>
   </el-container>
</template>
<script scoped>
export default {
    
}
</script>
<style scoped>
.el-main{
   min-height:calc(100vh - 120px);
}
.el-aside .el-menu{
    height:100%;
    padding-top:20px;
    box-sizing: border-box;
    
}
.exact-active{
    color:green;
}
</style>

