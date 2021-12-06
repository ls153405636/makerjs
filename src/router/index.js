import { createRouter, createWebHashHistory } from 'vue-router'


const routes =  [
  {
    path: '/',
    name: '',
    component: () => import('@/components/app/index.vue'),
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  // {
  //   path: '/shot',
  //   name: 'shot',
  //   component: () => import('@/components/app/ShotImg.vue'),
  //   meta: {
  //     keepAlive: false // 不需要被缓存
  //   }
  // },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router