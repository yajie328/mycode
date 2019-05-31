<template>
  <div id="app">
   <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import tab from './base/tab.vue'

export default {
  name: 'App',
  components:{
    tab
  }
}
</script>

<style>
*{margin:0; padding:0}
ul,li{list-style:none}
a{text-decoration: none}
input, button {appearance: none;}
.content{
  position:fixed;
  top:40px;
  bottom:50px;
  width:100%;
  overflow: auto;
}
</style>
