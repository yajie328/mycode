<template>
<div>
  <el-container>
        <el-header>
          <el-row>
            <el-col :span="4">
              
          </el-col>
            <el-col :span="20">
                <el-menu 
                  mode="horizontal"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  :router = "true"
                  :default-active="activeMenu"
                >
                  <el-menu-item index="/">首页</el-menu-item>
                  <el-menu-item index="/profile">个人中心</el-menu-item>
                  <el-menu-item index="/user">用户页面</el-menu-item>
                  <el-menu-item index="/tree">目录树</el-menu-item>
                  <el-menu-item index="/store">redux应用</el-menu-item>
                </el-menu>
                
            </el-col>
          </el-row>
            <!-- <router-link to="/" exact tag="span">首页</router-link>
            <router-link :to="{ path: '/user', params: { userId: 123 }}">用户</router-link>
            <router-link to="/profile">个人中心</router-link> -->
        </el-header>
        <el-main>
          <transition name="fade" mode="out-in">
              <keep-alive>
                <router-view v-if="$route.meta.keepAlive" class="transitionBody" v-title="$route.meta.title"></router-view>
              </keep-alive>
          </transition>
          <transition name="fade" mode="out-in">
              <router-view v-if="!$route.meta.keepAlive" class="transitionBody" v-title="$route.meta.title"></router-view>
          </transition>

          <router-view name="logo"></router-view>
          
        </el-main>
        <el-footer>footer</el-footer>
  </el-container>
  
 <!--  <el-container>
    <el-header>header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>footer</el-footer>
      </el-container>
    </el-container>
  </el-container> -->
</div>
</template>
<script>

export default {
  data(){
    return {
        activeMenu: null
    }
  },
  
    mounted(){
      if(this.$route.matched.length){
         this.setActive();
      }
    },
      watch: {
        '$route' (to, from) {
        // 对路由变化作出响应...
           this.setActive();
        }
     },
     methods:{
       setActive(){
          if(this.$route.path.indexOf(this.$route.matched[0].path) ===0){
            this.activeMenu = this.$route.matched[0].path || '/';
          }
       }
     }


    
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
[v-cloak] {
   display:none;

}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
.transitionBody{
  position: absolute;
  top:60px;
  bottom:60px;
  left:0;
  right:0;
}
.router-link-active{color:red;}
 </style>
<style scoped>
.el-main{
  min-height:calc(100vh - 120px);
}
.el-header, .el-footer{
  line-height:60px;
  background:#545c64;
  color:#fff;
}
.el-footer{
  position:fixed;
  width:100%;
  bottom:0;
}

</style>

