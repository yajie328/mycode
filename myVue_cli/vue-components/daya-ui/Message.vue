<template>
  <div class="messages" v-if="messages.length">
    <div v-for="m in messages" :key="m.id">{{m.message}}</div>
  </div>
</template>
<script>
export default {
  name: "message",
  data() {
    return { messages: [], id: 0 };
  },
  mounted() {
    console.log(this._info);
  },
  methods: {
    add(options) {
      let id = this.id++; // 弹层的id
      let layer = { ...options, id };
      this.messages.push(layer);
      layer.timer = setTimeout(() => {
        // 时间到了自己移除
        this.remove(layer);
      }, options.duration);
    },
    remove(layer) {
      clearTimeout(layer.timer);
      this.messages = this.messages.filter(message => message.id !== layer.id);
      console.log(this.messages);
    }
  }
};
</script>
