import { createRouter, createWebHashHistory } from 'vue-router'


const routes =  [
  {
    path: '/',
    name: '',
    component: () => import('@/components/app/index.vue')
  },
  {
    path: '/export',
    name: 'export',
    component: () => import('@/components/app/ExportPlanImg.vue')
  },
  {
    path: '/a',
    name: 'a',
    component: () => import('@/components/app/a.vue')
  },
  {
    path: '/b',
    name: 'b',
    component: () => import('@/components/app/b.vue')
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router