<template>
    <div>
        <Mheader :back="true">添加图书</Mheader>
        <div class="content">
            <div class="addWrap">
            <form role="form">
                <div class="form-group">
                    <label for="name">书名：</label>
                    <input type="email" class="form-control" id="name" placeholder="书名"  v-model="book.bookName">
                </div>
                <div class="form-group">
                    <label for="img">封面：</label>
                    <input type="email" class="form-control" id="img" placeholder="封面"  v-model="book.bookImg">
                </div>
                 <div class="form-group">
                    <label for="price">价格：</label>
                    <input type="email" class="form-control" id="price" placeholder="价格" v-model="book.bookPrice">
                </div>
                <button type="submit" class="btn btn-primary" @click="save">提交</button>
           </form>
           </div>
        </div>
    </div>
</template>
<script>
import Mheader  from '../base/Mheader.vue'
import {addBook} from '../api'
export default {
    data(){
        return {
            book:{}
        }
    },
    methods:{
        async save(){
            await addBook(this.book);
            this.$router.push('/list');
        }
    },
    components:{
        Mheader
    }
}
</script>
<style scoped>
.addWrap{
    padding:20px 20px;
}
</style>

