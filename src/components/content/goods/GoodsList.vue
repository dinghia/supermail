<template>
    <div class="goods-list">
        <goods-item v-for="(item,index) in goods" :goods-item="item"
        :key="index"></goods-item>
    </div>
</template>
<script>
import GoodsItem from "components/content/goods/GoodsItem"
export default {
    name:'GoodList',
    components:{
        GoodsItem,
    },
    props:{
        goods:{
            type:Array,
            default(){
                return [];
            }
        }
    },
}
</script>
<style>
  .goods-list{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
  }

</style>