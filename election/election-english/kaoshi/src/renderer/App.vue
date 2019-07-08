<template>
  <div id="app">
    <Head style="-webkit-app-region: drag"></Head>
    <div class="main">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '@/components/common/Header.vue'
  export default {
    name: 'app',
    data(){
      return {
       
      }
    },
    components:{
      Head
    }
  }
</script>

<style style="less">
  /* CSS */
  *{margin:0; padding:0;}
  .router-link-active{
    color:red;
  }
  .main{
    position:fixed;
    top:50px;
    width:100%;
    height: calc(100vh - 50px);
    
  }
  .content{
    padding:20px;
    margin:30px;
    height:calc(100% - 100px);
    border:1px solid #ccc;
}

</style>
