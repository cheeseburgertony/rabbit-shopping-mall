import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Login from '@/views/Login/index.vue'

const Category = () => import('@/views/Category/index.vue')
const SubCategory = () => import('@/views/SubCategory/index.vue')
const Detail = () => import('@/views/Detail/index.vue')
const CartList = () => import('@/views/CartList/index.vue')
const Checkout = () => import('@/views/Checkout/index.vue')
const Pay = () => import('@/views/Pay/index.vue')
const PayBack = () => import('@/views/Pay/PayBack.vue')
const Member = () => import('@/views/Member/index.vue')
const UserInfo = () => import('@/views/Member/components/UserInfo.vue')
const UserOrder = () => import('@/views/Member/components/UserOrder.vue')

const router = createRouter({
  // 打包时要使用hash模式才不会显示空白 并且在vite.config.js下的defineConfig要配置base: './',变成相对路径
  // 这样在没部署到服务器前才不会说只有在根路径下才能访问
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', component: Layout, children: [
        { path: '', component: Home },
        { path: '/category/:id', component: Category },
        { path: '/category/sub/:id', component: SubCategory },
        { path: '/detail/:id', component: Detail },
        { path: '/cartlist', component: CartList },
        { path: '/checkout', component: Checkout },
        { path: '/pay', component: Pay },
        { path: '/paycallback', component: PayBack },
        {
          path: '/member', component: Member, children: [
            { path: '', component: UserInfo },
            { path: 'order', component: UserOrder }
          ]
        },
      ]
    },
    { path: '/login', component: Login }
  ],
  // 路由滚动行为定制  (这里改为每次切换路由时都直接显示顶部，而不是在原来浏览的位置)
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
