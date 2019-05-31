<template>
    <div>
        添加用户
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    beforeRouteEnter(to,from ,next){ //页面权限， 没有this
        next(vm=>{
            // console.log(vm) // 这个组件会在渲染完毕后调用
        });
    },
    beforeRouteLeave(to,from,next){
        if(this.form.name && !this.flag){
            this.$confirm('确认关闭？')
            .then(_=>{
                next();
            })
            .catch(_=>{
               next(false)
            })
        }else{
            next();
        }
    },
    data(){
        return {
            flag:false,
            form:{
                name: '',
                desc: ''
            },
             rules: {
                name: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
             }
        }
    },
    methods:{
        submitForm(formName){
           this.$refs[formName].validate((valid) => {
            if (valid) {
                let userList = JSON.parse(localStorage.getItem('userList')) || [];
                userList.push({id:Math.random(), username: this.form.name})
                localStorage.setItem('userList',JSON.stringify(userList))
                this.flag = true;
                this.$router.push('/user/list');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

