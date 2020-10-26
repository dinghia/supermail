<template>
    <div class="shop-info">
        <div class="shop-top">
            <img :src="shop.logo">
            <span class="title">{{shop.name}}</span>
        </div>
    <div class="shop-middle">
        <div class="shop-middle-item shop-middle-left">
            <div class="info-sells">
                <div class="sells-count">
                    {{shop.sells | sellCountFilter}}
                </div>
                <div class="sells-text">总销量</div>
            </div>
            <div class="info-goods">
                <div class="goods-count">{{shop.goodsCount}}</div>
                <div class="goods-text">全部宝贝</div>
            </div>
        </div>
        <div class="shop-middle-item shop-middle-right">
            <table>
                <tr v-for="(item,index) in shop.score" :key="index">
                    <td>{{item.name}}</td>
                    <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
                    <td class="better" :class=" {'better-more':item.isBetter}"><span>{{item.isBetter?'高':'低'}}</span></td>
                </tr>
            </table>
        </div>
    </div>
    <div class="shop-bottom">
        <div class="enter-shop">进店逛逛</div>
    </div>

    
</div>
</template>
<script>
export default {
    name:'DetailShopInfo',
    props:{
        shop:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    filters:{
        sellCountFilter(value){
            if(value<10000) return value;
            return (value/10000).toFixed(1) +'万';
        }
    }
}
</script>
<style scoped>
  .shop-info{
      margin:20px 10px;
      background-color: #fff;
  }
  .shop-info .shop-top{
      display: flex;
  }
  .shop-info .shop-top img{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid gray;
  }
  .shop-info .shop-top .title{
      display: block;
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
  }
  .shop-middle{
      display: flex;
      justify-content: center;
  }
  .shop-middle-item{
      display: flex;
      
  }
  .shop-middle-item .info-sells,.info-goods{
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      margin: 10px;
  }
  .info-goods{
      border-right: 1px solid grey;
      padding-right: 15px;
  }
  .sells-text,.goods-text{
      padding-top: 5px;
      font-size: 12px;
  }
  .shop-middle-right{
      padding:10px;
      font-size: 12px;
      line-height: 20px;
  }
  .shop-middle-right td:nth-child(1){
      padding-right: 5px;
  }
  .score{
      color: green;
  }
  .better{
      color: honeydew;
      background-color: green;
  }
  .score-better{
      color: red;
  }
  .better-more{
      color: honeydew;
      background-color: red;
  }
  .shop-bottom{
      display: flex;
      justify-content: center;
      align-content: center;
  }
  .enter-shop{
      width: 100px;
      height: 30px;
      font-size: 13px;
      line-height: 30px;
      border-radius: 5px;
      background-color: gainsboro;
      text-align: center;

  }

</style>