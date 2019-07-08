<template>
  <div id="app">
    <cube-tab-bar
    v-model="selectedLabelDefault"
    :data="tabs"
    @click="clickHandler"
    >
  </cube-tab-bar>

    <router-view/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedLabelDefault: '/',
      tabs: [{
        label: '商品列表',
        value: '/',
        icon: 'cubeic-home',
      }, {
        label: '购物车',
        value: '/cart',
        icon: 'cubeic-like',
      }],
    };
  },
  methods: {
    clickHandler(label) {
      // if you clicked home tab, then print 'Home'
      this.$router.push(label);
    },
  },
  watch: {
    $route() {
      this.selectedLabelDefault = this.$route.path;
    },
  },
};
</script>

<style>
a.router-link-exact-active {
  color: #42b983;
}
</style>
