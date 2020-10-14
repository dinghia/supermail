import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () =>
    import ('../views/home/Home')
const Car = () =>
    import ('../views/car/Car')
const Category = () =>
    import ('../views/category/Category')
const My = () =>
    import ('../views/my/My')

Vue.use(VueRouter)

const routes = [{
    path: '',
    redirect: '/home',
}, {
    path: '/home',
    component: Home,
}, {
    path: '/car',
    component: Car,
}, {
    path: '/Category',
    component: Category,
}, {
    path: '/my',
    component: My,
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router