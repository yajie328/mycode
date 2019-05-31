import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
	// 渲染函数 这个函数很重要
	// 默认main文件中只支持render方法
	// template: `<div>123</div>`,
	methods: {
		say(){
			alert(1)
		}
	},
	render: function(h){ // 参数只能是h
		console.log(this); // 这个this 是一个代理，代理的就是当前的实例
		return <h1 
			on-click={()=>this.say()} 
			class="a"
			style={{color:'red'}}
			a="1"
			>点我啊</h1>
	}
			
}).$mount('#app')

