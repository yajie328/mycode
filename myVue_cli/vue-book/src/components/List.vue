<template>
    <div>
        <Mheader :back="true">列表页</Mheader>
        <div class="content">
            <ul>
                <router-link :to="{name:'detail', params:{did: item.bookId}}" tag="li" v-for="(item, key) in books" :key="key">
                    <img :src="item.bookImg" alt="">
                    <div>
                        <h4>{{item.bookName}}</h4>
                        <p>{{item.bookInfo}}</p>
                        <p>￥{{item.bookPrice}}</p>
                        <button @click.stop="remBook(item.bookId)">删除</button>
                    </div>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
import Mheader  from '../base/Mheader.vue'
import {getBooks, removeBook} from '../api'
export default {
    data(){
        return {
            books: []
        }
    },
    components:{
        Mheader
    },
    created(){
        this.getAllBook()
    },
    methods:{
        async getAllBook(){
          this.books =  await getBooks();
        },
        async remBook(id){
            this.books = await removeBook(id);
        }
    }
}
</script>
<style lang="less" scoped>
.content ul{
    padding:10px;
    li{
        display:flex;
        padding:10px 0;
        border-bottom:1px solid #f1f1f1;
    }
    img{ width:150px; height:150px;}
    h4{
        padding:20px 0 10px;
    }
    button{
        margin-top:10px;
        background:red;
        width:80px;
        height:30px;
        border:none;
        color:#fff;
        outline:none;
        border-radius: 5px;
    }
}
</style>


