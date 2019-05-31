<template>
	<div id="app">
		app
		<MyTitle :type="3" :say="say">title</MyTitle>
		<List :list="arr"></List>
		 <List :list="arr" :render="render"></List>

	</div>
</template>
<script>
// import MyTitle  from './components/MyTitle.vue'
import MyTitle  from './components/MyTitle.js'
import List  from './components/List.vue'
export default {
	name:'app',
	data(){
		return {
			arr: [1,2,3]
		}
	},
	components: {
		MyTitle,
		List
	},
	methods:{
		say(){
			alert(1)
		},
		render(h, a){
			return <h1>{a}</h1>
		}
	}
	
}
</script>

<style lang="less">

</style>
