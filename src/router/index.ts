import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: () => import('@/views/ShopView.vue'),
    },
    {
      path: '/culture',
      name: 'culture',
      component: () => import('@/views/CultureView.vue'),
    },
    {
      path: '/industry',
      name: 'industry',
      component: () => import('@/views/IndustryView.vue'),
    },
    {
      path: '/tech',
      name: 'tech',
      component: () => import('@/views/TechView.vue'),
    },
    {
      path: '/service',
      name: 'service',
      component: () => import('@/views/ServiceView.vue'),
    },
    {
      path: '/carbon',
      name: 'carbon',
      component: () => import('@/views/CarbonView.vue'),
    },
    {
      path: '/market',
      name: 'market',
      component: () => import('@/views/MarketView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
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
