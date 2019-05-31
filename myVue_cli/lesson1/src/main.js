import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  // 渲染函数 这个函数很重要
  render: h => h(App),
}).$mount('#app')
