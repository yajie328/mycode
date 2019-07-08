<template>
    <div>
        <Head2></Head2>
        <router-link to="/check/info">01 信息核对</router-link>
        <router-link to="/check/device">02 设备检测</router-link>
        <router-link to="/check/rule">03 考场规则</router-link>
        <router-link to="/check/end">04 开始考试</router-link>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import Head2 from '@/components/common/Header2.vue'
export default {
    components:{
        Head2
    }
}
</script>
<style>

</style>


