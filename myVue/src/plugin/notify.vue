<template>
    <div>
        <div class="notify">{{value}}</div>
    </div>
</template>
<script>
export default {
   data(){
       return {value:'我是大雅'}
   }
    
}
</script>
<style scoped>
.notify{
    width:100px;
    height:60px;
    border-radius: 3px;
    background:gray;
    color: #000;
}
</style>


