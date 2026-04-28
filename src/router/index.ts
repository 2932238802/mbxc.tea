import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: () => import('@/views/LosIndexView.vue'),
    },
    {
      path: '/culture',
      name: 'culture',
      component: () => import('@/views/LosCultureView.vue'),
    },
    {
      path: '/industry',
      name: 'industry',
      component: () => import('@/views/LosIndustryView.vue'),
    },
    {
      path: '/tech',
      name: 'tech',
      component: () => import('@/views/LosTechView.vue'),
    },
    {
      path: '/service',
      name: 'service',
      component: () => import('@/views/LosServiceView.vue'),
    },
    {
      path: '/carbon',
      name: 'carbon',
      component: () => import('@/views/LosCarbonView.vue'),
    },
    {
      path: '/market',
      name: 'market',
      component: () => import('@/views/LosMarketView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/LosDashboardView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
