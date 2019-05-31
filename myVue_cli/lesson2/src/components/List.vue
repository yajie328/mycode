<template>
	<ul>
		<template v-if="!render">
			<li v-for="item in list" :key="item">
				{{item}}
			</li>
		</template>
		<template v-else v-for="item in list">
			<List :render="render" :key="item" :a="item"></List>
		</template>
	</ul>
</template>
<script>
import List from './List.js'
export default {
	props:["list", "render"],
	components: {
		List
	}
}
</script>
