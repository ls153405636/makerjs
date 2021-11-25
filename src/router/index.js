import { createRouter, createWebHashHistory } from 'vue-router'

import exportPlanImg from '../d2/export/plan_img/ExportPlanImg.vue'
import Index from '../components/app/index.vue'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import( /* webpackChunkName: "shouye" */ '../components/app/index.vue')
    },
    {
      path: '/export',
      name: 'export',
      component: () => import( /* webpackChunkName: "export" */ '../d2/export/plan_img/ExportPlanImg.vue')
    },
  ]
})

export default router