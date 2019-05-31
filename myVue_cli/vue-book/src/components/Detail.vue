<template>
    <div class="detail">
        <Mheader :back="true">详情</Mheader>
        <div class="innerWrap">
            <form role="form">
                <div class="form-group">
                    <label for="name">书名：</label>
                    <input type="email" class="form-control" id="name" v-model="book.bookName">
                </div>
                <div class="form-group">
                    <label for="img">封面：</label>
                    <input type="email" class="form-control" id="img" v-model="book.bookImg">
                </div>
                 <div class="form-group">
                    <label for="price">价格：</label>
                    <input type="email" class="form-control" id="price" v-model="book.bookPrice">
                </div>
                <button type="submit" class="btn btn-success" @click="save">保存</button>
           </form>
        </div>
    </div>
</template>
<script>
import Mheader  from '../base/Mheader.vue'
import {getDetailBook, updateBook} from '../api'
export default {
    data(){
        return {
            id: this.$route.params.did,
            book:{}
        }
    },
    created(){
        this.getOnebook();
    },
    methods:{
        async getOnebook(){
             this.book = await getDetailBook(this.id);
            console.log(this.book);
        },
        async save(){
           await updateBook(this.id, this.book);
           this.$router.push('/list'); // 修改完成后跳转页面
        }

    },
    components:{
        Mheader
    }
}
</script>
<style lang="less" scoped>
.detail{
    position:fixed;
    left:0;
    top: 40px;
    right:0;
    bottom:0;
    z-index:2;
    background:#fff;
}
.innerWrap{
    padding:20px;
}
</style>


