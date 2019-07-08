<template>
<div id="app">
    app.vue
    <router-link to="/">bar</router-link>
    <router-link to="/foo">foo</router-link>
    <router-view></router-view>
</div>
</template>
<script>
export default {
    metaInfo:{
        title: 'DefaultTitle'
    },
    components:{
    }
}
</script>

