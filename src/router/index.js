import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Cart from '@/views/Cart'
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/Cart',
        component: Cart
      },
      {
        path: '/category/:id',
        component: () => import('@/views/Category')
      },
      {
        path: '/category/sub/:id',
        component: () => import('@/views/Category/Sub')
      },
      {
        path: '/goods/:id',
        component: () => import('@/views/Goods')
      }
    ]
  },
  {
    path: '/playground',
    component: () => import('@/views/Playground')
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/login/callback',
    component: () => import('@/views/Login/callback')
  }
]
// 创建路由实例
const router = createRouter({
  // 使用hash方式实现路由
  history: createWebHashHistory(),
  // 配置路由规则，写法和之前一样
  routes
})

export default router
