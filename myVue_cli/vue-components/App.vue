<template>
  <div>
    <!-- <DatePicker v-model="now"></DatePicker>xxx -->
    <button @click="showMessage">点我弹层</button>
  </div>
</template>
<script>
import Vue from "vue";
// import DatePicker from "./daya-ui/date-picker";
import Message from "./daya-ui/daya-ui.js";
Vue.use(Message, { duration: 1000 });
export default {
  name: "app",
  data() {
    return {
      now: new Date()
    };
  },
  mounted() {
    console.log(this._info);
  },
  methods: {
    showMessage() {
      this.$message.info({
        message: "我是大雅",
        duration: 3000
      });
    }
  },
  components: {
    // DatePicker
  }
};
</script>

