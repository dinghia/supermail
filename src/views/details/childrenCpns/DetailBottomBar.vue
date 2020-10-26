<template>
    <div class="bottom-bar">
        <div class="bar-item bar-left">
            <div>
                <i class="icon service"></i>
                <span class="text">客服</span>
            </div>
            <div>
                <i class="icon shop"></i>
                <span class="text">店铺</span>
            </div>
            <div>
                <i class="icon select"></i>
                <span class="text">收藏</span>
            </div>
        </div>
        <div class="bar-item bar-right">
            <div class="cart" @click="addTocart">加入购物车</div>
            <div class="buy">购买</div>
        </div>
        <!-- <sport-ball ref="ball" class="sport-ball"></sport-ball> -->
    </div>
</template>
<script>
export default {
    name:'DetailBottomBar',
    methods:{
        addTocart(){

        }
    }
}
</script>
<style scoped>
  .bottom-bar{
      height: 58px;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9;
      display: flex;
      text-align: center;
      background-color: #fff;
  }
  .bar-item{
      flex:1;
      display: flex;
  }
  .bar-item>div {
      flex: 1;
  }
  .bar-left .text {
      font-size: 13px;
    }
  .bar-left .icon {
      display: block;
      width: 22px;
      height:22px;
      margin: 5px 19px;
  }
  .bar-left .service{
      background: url("~assets/img/detail/people.svg");
      background-size:100%
  }
  .bar-left .shop{
      background: url("~assets/img/detail/cart.svg");
      background-size:100%;
  }
  .bar-left .select{
      background: url("~assets/img/detail/star.svg");
      background-size:100%;
  }
  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 58px;
    }

  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }

  .bar-right .buy{
      background-color: #f69;
  }
  

</style>