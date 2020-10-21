<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import BScroll from "better-scroll"
export default {
    name:'Scroll',
    mounted(){
        //1、创建scroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad,
        })
        //2、监听滚动对象
        this.scroll.on("scroll",(position)=>{
            this.$emit("scroll",position);
        })
        //3、监听上拉加载更多事件
        this.scroll.on("pullingUp",()=>{
            this.$emit("pullingUp")
        })
    },
    data(){
        return {
            scroll:null,
        }
    },
    props:{
        probeType:{
            type:Number,
            default:0,
        },
        pullUpLoad:{
            type:Boolean,
            default:false,
        }
    },
    methods:{
        scrollTo(x,y,time=300){
            //为了使代码更严谨，可以先判断一下是否存在这个实例化对象。
            this.scroll&&this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
            this.scroll.finishPullUp()
        },
        refresh(){
            this.scroll.refresh()
            // console.log("-------")
        }
    }
}
</script>