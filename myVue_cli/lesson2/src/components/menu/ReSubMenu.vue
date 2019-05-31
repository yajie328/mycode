<template>
    <SubMenu>
        <template #title>
            {{data.title}}
        </template>
        <template v-for="child in data.children">
            <MenuItem  :key="child.title" v-if="!child.children">{{child.title}}</MenuItem>
            <ReSub v-else :key="child.title" :data="child"></ReSub>
        </template>
    </SubMenu>
</template>
<script>
import MenuItem from './MenuItem.vue';
import SubMenu from './SubMenu.vue'
export default {
    name: "ReSub",
    props:{
        "data":{
            type: Object,
            default:()=>({})
        }
    },
    components:{
        MenuItem,
        SubMenu
    }
}
</script>
