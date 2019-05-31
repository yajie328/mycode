<template>
<div class="container">
    <h3>{{state? '已经登录': '没登录'}}</h3>
    <el-form style="margin-top:20px;">
        <el-form-item>
            <el-button @click="login" type="primary" round>登录</el-button>
            <el-button @click="quit" round>退出</el-button>
        </el-form-item>
    </el-form>

</div>
</template>
<script>
export default {
    data(){
        return {
            state: localStorage.getItem('login')
        }
    },
    methods:{
        login(){
            localStorage.setItem('login', true);
            this.state = true;
        },
        quit(){
            localStorage.removeItem('login');
            this.state = false;
        }
    }

}
</script>
<style scoped>
.container {
    padding:20px;
}
</style>