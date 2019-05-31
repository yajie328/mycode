<template>
    <div>
        <Mheader>首页</Mheader> 
        <div class="content">
            <Swiper :swiperSlides="sliders"></Swiper>
            <div class="container">
                <h3>热门图书</h3>
                <ul class="list">
                    <router-link :to="{name:'detail', params:{did: book.bookId}}" tag="li" v-for="(book, key) in hotBooks" :key="key">
                        <img :src="book.bookImg" alt="">
                        <span class="bookname">{{book.bookName}}</span>
                        <span class="bookprice">￥{{book.bookPrice}}</span>
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Mheader from '../base/Mheader';
import Swiper from './Swiper'
import {getSliders, getHotBooks} from '../api'

export default {
    data(){
        return {
            sliders:[],
            hotBooks: []
        }
    },
    created(){
        this.getSlider();
        this.getHootbook();
    },
    methods:{
        async getSlider(){
            this.sliders = await getSliders()
        },
        async getHootbook(){
            this.hotBooks = await getHotBooks();
        }
    },
    components:{
        Mheader,
        Swiper
    }
}
</script>
<style lang="less" >

.container{
    width:90%;
    margin:0 auto;
    h3{ padding: 10px 0;}
.list{
    display:flex;
    flex-wrap:wrap;
    li{ 
        display:flex; 
        width:50%; 
        flex-wrap:wrap;
        justify-content: center;
        margin-bottom:20px;
        img{
            width:150px;
            height:150px;
            max-width:200px;
            flex-shrink:0
        }
        .bookname{
           padding-right:10px;
        }
        .bookprice{
            color:red;
        }

    }
}
}
</style>


