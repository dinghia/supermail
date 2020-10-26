<template>
    <nav-bar>
        <div slot="left" class="left" @click="back">
            <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="center">
            <div v-for="(item,index) in titles" 
            :key="index"
            @click="itemClick(index)"
            :class="{active:currentIndex===index}">{{item}}</div>
        </div>
    </nav-bar>
</template>
<script>
import navBar from 'components/common/navbar/NavBar'
export default {
    name:'detail',
    data(){
        return {
            titles:["商品","参数","评论","推荐"],
            currentIndex:0,
        }
    },
    components:{
        navBar,
    },
    methods:{
        itemClick(index){
            this.currentIndex=index;
            //实现点击滚动页面到对应位置
            this.$emit('titleClick',index)
        },
        back(){
            this.$router.back();
        }
    }
}
</script>
<style scoped>
  .left img{
      width: 35px;
      height: 35px;
      background-size: 100%;
      padding-top: 10px;
  }
  .center{
      display: flex;
      justify-content: space-evenly
  }
  .active{
      color: var(--color-high-text);
  }
</style>