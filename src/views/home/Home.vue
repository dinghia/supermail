<template>
    <div>
        <nav-bar class="nav-bar">
            <div slot="center">购物节</div>
        </nav-bar>
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
    </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar"
import HomeSwiper from "views/home/childrenCpns/HomeSwiper"
import RecommendView from "views/home/childrenCpns/RecommendView"

import {getHomeMultidata} from 'network/home'

export default {
    name:'home',
    components:{
        NavBar,
        HomeSwiper,
        RecommendView,
    },
    data(){
        return {
            banners:[],
            recommends:[],
        }
    },
    created(){
        getHomeMultidata().then(res=>{
            console.log(res);
            this.banners=res.data.banner.list;
            this.recommends=res.data.recommend.list;
        })
    },
}
</script>
<style>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>