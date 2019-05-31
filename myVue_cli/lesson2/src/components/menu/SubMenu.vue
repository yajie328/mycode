<template>
    <div class="sub">
        <div class="title" @click="change">
            <slot name="title"></slot>
        </div>
        <div v-show="flag">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            flag: true
        }
    },
    methods:{
        change(){
            this.flag = !this.flag
        }
    }
}
</script>
<style>
.sub{ padding-left:20px;}
</style>


