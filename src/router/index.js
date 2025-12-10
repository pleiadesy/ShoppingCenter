import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:'/', redirect: '/layout'},
    {path:'/login', component: Login},
    {path:'/layout', component: Layout, children: [
      {path:'/home', component: Home},
      {path:'/category', component: Category}
    ], default: '/home'}
  ],
})

export default router
