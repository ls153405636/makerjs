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
    path: '/shot',
    name: 'shot',
    component: () => import('@/components/app/ScreenShot.vue')
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router