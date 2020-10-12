<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive"><slot name='item-icon'></slot></div>
        <div v-else><slot name='item-icon-active'></slot></div>
        <div :style="activeStyle"><slot name='item-text'></slot></div>
        <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
        <div>首页</div> -->
    </div>
</template>
<script>

export default {
    name:'TabBarItem',
    data(){
        return {
          // 不能使用的原因
            // isActive:this.$route.path.indexOf(this.path) !== -1,
        }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path) !== -1;
      },
      activeStyle(){
        //判断当前是否处于活跃状态，活跃就赋给颜色的属性，不活跃就是空对象。
        return this.isActive ? {color:this.activeColor}:{};
      }
    },
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'red'},//默认active文字颜色为红色
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path)
      }
    }
}
</script>
<style>
  .tab-bar-item{
    height: 49px;
    flex:1;
    text-align: center;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }
  /* .active{
      color:deeppink;
  } */
  /* 修改为计算属性，判断当前是否处于active状态 */
</style>

