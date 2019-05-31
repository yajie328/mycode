<template>
    <div>
        <Mheader :back="true">collect</Mheader>
        <div class="content">
            <Carousel :list="sliders"></Carousel>
        </div>
    </div>
</template>
<script>

import Mheader  from '../base/Mheader.vue'
import Carousel from './Carousel.vue'
import {getSliders, getHotBooks} from '../api'
export default {
     data(){
        return {
            sliders:[]
        }
    },
    created(){
        this.getSlider();
    },
    methods:{
        async getSlider(){
            this.sliders = await getSliders()
        }
    },
    components:{
        Mheader,
        Carousel
    }
}
</script>
<style>
</style>


