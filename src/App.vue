<template>
  <div id="app">
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
    <!-- 驼峰命名在这里不能使用，只能用连接符 -->
    <tab-bar>
      <tab-bar-item path="/home" activeColor="blue">
        <img slot="item-icon" src="./assets/img/tabbar/home.svg" alt="">
        <img slot="item-icon-active" src="./assets/img/tabbar/home-active.svg" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="item-icon" src="./assets/img/tabbar/category.svg" alt="">
        <img slot="item-icon-active" src="./assets/img/tabbar/category-active.svg" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/car">
        <img slot="item-icon" src="./assets/img/tabbar/car.svg" alt="">
        <img slot="item-icon-active" src="./assets/img/tabbar/car-active.svg" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/my">
        <img slot="item-icon" src="./assets/img/tabbar/my.svg" alt="">
        <img slot="item-icon-active" src="./assets/img/tabbar/my-active.svg" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>
<script>
import TabBar from './components/common/tabbar/Tabbar'
import TabBarItem from './components/common/tabbar/TabBarItem' 

export default {
  name:'App',
  components:{
    TabBar,
    TabBarItem,
  }
}
</script>
<style>
  @import "./assets/css/base.css";
</style>
