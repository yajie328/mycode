<template>
<div class="header2">
    <span>{{title}}</span>
    <span class=""><img />距离考试还剩{{distime}}</span>
</div>
</template>
<script>
export default {
    data(){
      return {
        title: "2019年北京市小学英语教师测评考试",
        distime: "09:20"
      }
    },
}
</script>

<style scoped>
.header2{
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  height:40px;
}
</style>

