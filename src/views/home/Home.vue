<template>
    <div id="home">
        <nav-bar class="nav-bar">
            <div slot="center">购物节</div>
        </nav-bar>

        <tab-control :title="['流行','新款','精选']" 
            @tabClick="tabClick" 
            class="tabControl" 
            ref="tabControl1"
            v-show="isTabFixed"></tab-control>

        <scroll class="content"
         ref="scroll" 
         :probe-type="3" 
         @scroll="contentScroll" 
         :pull-up-load="true"
         @pullingUp="loadMore">
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control :title="['流行','新款','精选']" 
            @tabClick="tabClick" 
            class="tabControl" 
            ref="tabControl2"></tab-control>
            <goods-list :goods="goods[currentType].list"></goods-list>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
        

    </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar"
import Scroll from "components/common/scroll/Scroll"
import TabControl from "components/content/tabcontrol/TabControl"
import GoodsList from "components/content/goods/GoodsList"
import BackTop from "components/content/backTop/BackTop"

import RecommendView from "./childrenCpns/RecommendView"
import FeatureView from "./childrenCpns/FeatureView"
import HomeSwiper from "./childrenCpns/HomeSwiper"

import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'
export default {
    name:'home',
    components:{
        NavBar,
        HomeSwiper,
        Scroll,
        TabControl,
        GoodsList,
        BackTop,

        RecommendView,
        FeatureView,

    },
    data(){
        return {
            banners:[],
            recommends:[],
            goods:{
                pop:{page:0,list:[]},
                new:{page:0,list:[]},
                sell:{page:0,list:[]}
            },
            currentType:'pop',
            isShowBackTop:false,
            tabOffsetTop:0,
            isLoad:false,
            isTabFixed:false,
            saveY:0,
            itemImgListener:null,
        }
    },
    created(){
        this.getHomeMultidata();

        this.getHomeGoods("pop");
        this.getHomeGoods("new");
        this.getHomeGoods("sell");
    },
    activated(){
        this.$refs.scroll.scroll.scrollTo(0,this.saveY)
        //重新定位之后，最好刷新一下页面，否则可能出现自动滚动到页面，不能滚动的问题。
        this.$refs.scroll.refresh();
    },
    deactivated(){
        //保存y值
        this.saveY=this.$refs.scroll.scroll.y
        //在离开组件时，取消监听事件总线
        this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    mounted(){
        //将频繁执行的函数进行防抖处理
        const refresh = debounce(this.$refs.scroll.refresh,200);

        //监听image图片加载完毕
        // this.$bus.$on("itemImageLoad",()=>{
            //这个函数要被多次执行，所以对其进行防抖处理
            // this.$refs.scroll.refresh()
            // 调用防抖处理之后的函数
            // refresh();
        // })
        //抽离函数
        this.itemImgListener=()=>{
            refresh();
        }
        this.$bus.$on("itemImageLoad",this.itemImgListener)
    },
    methods:{
        // 这是自己定义的函数
        getHomeMultidata(){
            // 这是调用的请求数据的函数
            getHomeMultidata().then(res=>{
            // console.log(res);
            this.banners=res.data.banner.list;
            this.recommends=res.data.recommend.list;
        })
        },
        //这是在Home组件中自定义的函数
        getHomeGoods(type){
            const num = this.goods[type].page + 1;
            //这是调用的home.js文件里面的函数，用于请求数据，不要和上面的弄混
            getHomeGoods(type,num).then(res=>{
            // console.log(res);
            //可以使用遍历，这里使用...es6的语法
            this.goods[type].list.push(...res.data.list);
            this.goods[type].page+=1;

            //调用pullUpLoad的finish函数,结束上次的下拉加载更多
            this.$refs.scroll.finishPullUp()
        })
        },
        tabClick(index){
            switch(index){
                case 0:
                    this.currentType='pop'
                    break;
                case 1:
                    this.currentType='new'
                    break;
                case 2:
                    this.currentType='sell'
                    break;
            };
            this.$refs.tabControl1.currentIndex=index;
            this.$refs.tabControl2.currentIndex=index;
        },
        backClick(){
            this.$refs.scroll.scrollTo(0,0,500);
        },
        contentScroll(position){
            // console.log(position)
            this.isShowBackTop=(-position.y)>1000;
            this.isTabFixed=(-position.y)>this.tabOffsetTop;
        },
        loadMore(){
            this.getHomeGoods(this.currentType);
            //此时只能实现上拉加载更多的功能一次，必须添加finish函数
            //这里在getHomeGoods的最后进行，调用scroll的finish函数
        },
        
        swiperImageLoad(){
            if(!this.isLoad){
                this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
                // console.log(this.$refs.tabControl2.$el.offsetTop);
                this.isLoad=true
            }
            
        },

    }
        
}
</script>
<style scoped>
  #home{
      padding-top: 44px;
      height: 100vh;
      position: relative;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    /* 固定nav-bar */
    /* 使用better-scroll实现局部滚动之后，就不需要再固定navbar的位置了 */
    position: fixed;
    top: 0; 
    left: 0;
    right: 0;
    z-index: 9;
  }
  .tab-control{
      /* 实现吸顶效果 */
      /* 在设置better-scroll之后,里面的tab-control就不起效果了 */
      /* position: sticky;
      top: 44px;
      z-index: 9; */
      position: relative;
      z-index: 9;
  }
  .content{
      /* height: 300px; */
      /* 注意这个高度在home中设置了100vh，所以这里才能有效果 */
      overflow: hidden;
      position: absolute;
      top: 44px;
      left: 0;
      right: 0;
      bottom: 49px;
  }
  
</style>