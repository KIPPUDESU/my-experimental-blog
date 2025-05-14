// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
 // 这里单独用 `import type` 语法
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: () => import('../pages/Home.vue') },
  { path: '/login', component: () => import('../pages/Login.vue') },
  { path: '/register', component: () => import('../pages/Register.vue') },
  { path: '/admin', component: () => import('../pages/Admin.vue') },
  { path: '/article/:id', component: () => import('../pages/ArticleDetail.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
