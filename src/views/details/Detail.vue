<template>
    <div class="detail">
        <detail-navbar class="detail-nav" @titleClick='titleClick' ref="nav"></detail-navbar>
        <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type='3'>
            <detail-swiper :swiperData="swiperData"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-info :detail-info="detailinfo" @imageLoad='imageLoad'></detail-info>
            <detail-params-info :paramInfo="paramInfo" ref='params'></detail-params-info>
            <detail-comment-info :comment-info="commentInfo" ref="comment"/>
            <goods-list :goods="recommends" ref="recommend"/>
        </scroll>
        <detail-bottom-bar/>
        <back-top v-show="isShowBackTop" @click.native="backTop"/>
    </div>
</template>
<script>
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
import {debounce} from 'common/utils.js'
import {itemListenerMixin,backTopMixin} from 'common/mixin'

import DetailNavbar from './childrenCpns/DetailNavbar'
import DetailSwiper from './childrenCpns/DetailSwiper'
import DetailBaseInfo from './childrenCpns/DetailBaseInfo'
import DetailShopInfo from './childrenCpns/DetailShopInfo'
import DetailInfo from './childrenCpns/DetailInfo'
import DetailParamsInfo from './childrenCpns/DetailParamsInfo'
import DetailCommentInfo from './childrenCpns/DetailCommentInfo'
import DetailBottomBar from './childrenCpns/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

export default {
    name:'detail',
    data(){
        return {
            iid:null,
            swiperData:[],
            goods:{},
            shop:{},
            detailinfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            // itemImgListener:null,
            themeTopYs:[],
            currentIndex:0,
            isShowBackTop:false,
        }
    },
    mixins:[itemListenerMixin,backTopMixin],
    components:{
        DetailNavbar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailInfo,
        DetailParamsInfo,
        DetailCommentInfo,
        DetailBottomBar,

        Scroll,
        GoodsList,
    },
    created(){
        this.iid=this.$route.params.iid;
        //请求数据
        getDetail(this.iid).then(res=>{
            const data = res.result;
            // console.log(data)
            //请求轮播图数据
            this.swiperData=data.itemInfo.topImages;
            //请求商品信息
            this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            // console.log(this.goods)
            //请求商家信息
            this.shop=new Shop(data.shopInfo)
            // console.log(this.shop)
            //请求商品图片
            this.detailinfo = data.detailInfo;
            //请求商品参数
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
            // console.log(this.paramInfo)
            //请求评论参数,存在没有评论的情况
            if(data.rate.cRate!==0){
                this.commentInfo = data.rate.list[0];
            }
        });
        getRecommend().then(res=>{
            // console.log(res)
            this.recommends=res.data.list;
            // console.log(res.data.list)
        })
    },
    mounted(){
        //使用混入，所以下面的注释
        // this.itemImgListener=debounce(this.$refs.scroll.refresh,100)
        // this.$bus.$on('itemImageLoad',this.itemImgListener)
    },
    destroyed(){
        this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    methods:{
        //新的imageLoad函数时用来获取offsetTop的值的，实现点击滚动到对应的位置
        imageLoad(){
            this.$refs.scroll.refresh();
            // console.log('22'),只会打印一次，因为事件只发出了一次
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)        
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)        
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            this.themeTopYs.push(Number.MAX_VALUE)
            console.log(this.themeTopYs)      
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
        },
        contentScroll(position){
            // console.log(position)
            let length=this.themeTopYs.length
            // for(let i=0;i<length-1;i++){
            //     if (this.currentIndex !== i &&(position.y >= this.themeTopYs[i] && position.y < this.themeTopYs[i+1])) {
            //         this.currentIndex = i;
            //         this.$refs.nav.currentIndex = this.currentIndex
            //     }
            // }

            //返回顶部
            this.isShowBackTop = -position.y>200;
        }
    }
}
</script>
<style scoped>
  .detail{
      height: 100vh;
      position: relative;
      background-color: #fff;
      z-index: 9;
  }
  .detail-nav{
      background-color: #fff;
      position: relative;
      z-index: 9;
  }
  .content{
      height: calc(100% - 44px - 58px);
  }

</style>