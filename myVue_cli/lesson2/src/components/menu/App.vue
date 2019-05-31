<template>
	<div id="app">
		<Menu>
			<template v-for="menu in menuList" >
				<MenuItem 
					v-if="!menu.children" 
					:key="menu.title" 
				>{{menu.title}}
				</MenuItem>
				<ReSubMenu v-else :key="menu.title" :data="menu"></ReSubMenu>
			</template>
		</Menu>
	</div>
</template>
<script>
import Menu from './Menu.vue';
import MenuItem from './MenuItem.vue';
// import SubMenu from './SubMenu.vue'
import ReSubMenu from "./ReSubMenu.vue"
export default {
	name:'app',
	data () {
		return {
			menuList:[
				{
					title: '菜单1',
					children:[
						{
							title: '菜单1-1',
							children: [
								{
									'title': '菜单1-1-1',
									children: [
										{'title': '菜单1-1-1-1'},
										{'title': '菜单1-1-1-2'}
									]
								},
								{'title': '菜单1-1-2'}
							]
						},
						{title: '菜单1-2'},
						{title: '菜单1-3'}
					]
				},{
					title: '菜单2'
				},{
					title: '菜单3'
				}
			]
		}
	},
	components: {
		Menu,MenuItem,ReSubMenu
	}
	
}
</script>

<style lang="less">

</style>