<template>
  <swiper :options="swiperOption">
    <swiperSlide v-for="(slide, key) in swiperSlides" :key="key">
      <img :src="slide" alt="">
    </swiperSlide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
 
<script>
// import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    props:{
      swiperSlides:{
        type: Array,
        default: []
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
          loop: true,
          autoplay:true
        }
      }
    }
  }
</script>
<style lang="less" scoped>
img{width:100%;}
</style>
