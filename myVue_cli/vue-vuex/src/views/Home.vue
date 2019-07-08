<template>
  <div class="home">
    商品页面
  </div>
</template>

<script>
// @ is an alias to /src
// import { mapActions } from 'vuex'; // 第二种
import { createNamespacedHelpers } from 'vuex'; // 第三种
import * as types from '../store/mutation-type';

const { mapActions } = createNamespacedHelpers('product'); // 第三种避免后面使用加前缀，适用于多个

export default {
  methods: {
    // ...mapActions('product', [types.get_product_list]), // 第二种使用加前缀
    ...mapActions([types.get_product_list]),
  },
  mounted() {
    this[types.get_product_list]();
    // this.$store.dispatch(`product/${types.get_product_list}`); // 第一种：直接用简单暴力
  },
};
</script>
