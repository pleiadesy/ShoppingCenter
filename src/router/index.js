import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Details from '@/views/Details/index.vue'
import Cart from '@/views/Cart/index.vue'
import Order from '@/views/Order/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/PayBack/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 登录页面路由
    {path:'/login', name: 'login', component: Login},
    // 主页相关路由
    {path:'/', name: 'layout', component: Layout, children: [
      {path:'', name: 'home', component: Home},
      {path:'category/:id', name: 'category', component: Category},
      {path: 'category/sub/:id', name: 'subCategiry', component: SubCategory},
      {path: 'detail/:id', name: 'details', component: Details},
      {path: '/cart', name: 'cart', component: Cart},
      {path: '/order', name: 'order', component: Order},
      {path: '/pay', name: 'pay', component: Pay},
      {path: '/paycallback', name: 'payback', component: PayBack}
    ]}
  ],
})

export default router
