<template>
    <div class="goods-item" @click="itemClick">
        <img :src="getImg" alt="" @load="imageLoad">
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name:'GoodsItem',
    props:{
        goodsItem:{
            type:Object,
            default(){
                return {};
            }
        },
    },
    methods:{
        imageLoad(){
            // console.log("imageload")
            this.$bus.$emit('itemImageLoad')
        },
        //点击跳转到详情页
        itemClick(){
            // console.log("xiangqiangye")
            this.$router.push("/detail/"+this.goodsItem.iid)
        }
    },
    computed:{
        getImg(){
            return this.goodsItem.image || this.goodsItem.show.img
        }
    },
}
</script>
<style>
  .goods-item{
      width: 48%;
      margin-bottom: 10px;
      /* position: relative; */
  } 
  .goods-item img{
      width: 100%;
      border-radius: 5px;
  }
  .goods-info{
      font-size: 12px;
      text-align: center;
      /* position: absolute;
      left: 0;
      right: 0;
      bottom: 0; */
      overflow: hidden;
  } 
  .goods-info p{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
  }
  .goods-info .price{
      color:var(--color-high-text);
      margin-right: 20px;
  }
  .goods-info .collect{
      position: relative;
  }
  .goods-info .collect::before{
      content: '';
      position: absolute;
      left: -15px;
      top: -1px;
      width: 14px;
      height: 14px;
      background: url('~assets/img/common/collect.svg');
      background-size: 100%;
  }

</style>