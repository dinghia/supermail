import { debounce } from './utils'
import BackTop from 'components/content/backTop/BackTop'
//下面的混入是监听图片加载完成后刷新的功能
//在Detail组件中使用，在Home组件中未使用
//方便后期查看代码时，进行对比
export const itemListenerMixin = {
        data() {
            return {
                itemImageListener: null,
            }
        },
        mounted() {
            this.itemImageListener = debounce(this.$refs.scroll.refresh, 100)
            this.$bus.$on('itemImageLoad', this.itemImageListener)

        }
    }
    //下面的混入是对返回顶部按钮的封装
    //在Detail组件中使用，在Home组件中未使用
export const backTopMixin = {
    components: {
        BackTop,
    },
    methods: {
        backTop() {
            this.$refs.scroll.scrollTo(0, 0, 300)
        }
    }
}