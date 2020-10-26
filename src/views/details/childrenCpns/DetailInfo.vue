<template>
    <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
        <div class="info-desc clear-fix">
            <div class="start"></div>
            <div class="desc">{{detailInfo.desc}}</div>
            <div class="end"></div>
        </div>
        <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
        <div class="info-list">
            <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" 
            :src="item" alt="" @load="imgLoad">
    </div>
</div>
</template>

<script>
export default {
    name:'detailInfo',
    data(){
        return {
            counter:1,
            imageLength:0,
        }
    },
    props:{
        detailInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        imgLoad(){
            this.counter+=1;
            if(this.counter===this.imageLength){
                this.$emit("imageLoad");
            }
        }
    },
    //获取imageLength的值，这种方式可以避免多次重新计算获取的图片的长度
    watch:{
        detailInfo(){
            // console.log(this.detailInfo)
            this.imageLength=this.detailInfo.detailImage[0].list.length
        }
    }
}
</script>
<style scoped>
  .goods-info {
      padding: 20px 0;
      border-bottom: 5px solid #f2f5f8;
      background-color: #fff;
  }
  .info-list img{
      width: 100%;
  }

</style>