<template>
    <div class="tab-control">
        <div v-for="(item,index) in title" 
        :key="index"
        class="tab-control-item" 
        :class="{active:currentIndex==index}" 
        @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name:'TabControl',
    props:{
        title:{
            type:Array,
            default(){
                return [];
            }
        }
    },
    data(){
        return {
            currentIndex:0,
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex=index;
            this.$emit('tabClick',index);
        }
    }
}
</script>
<style>
  .tab-control{
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: white;
      display: flex;
  }
  .tab-control-item{
      flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
      border-bottom: 2px solid var(--color-tint);
      padding-bottom: 5px;
  }
</style>