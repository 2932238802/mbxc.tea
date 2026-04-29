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
      path: '/login',
      name: 'login',
      component: () => import('@/views/LosLoginView.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/LosRegisterView.vue'),
      meta: { guestOnly: true },
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
      meta: { requiresAuth: true, requiresAdmin: true },
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

router.beforeEach((to) => {
  const token = localStorage.getItem('losteapy_token')
  const userRaw = localStorage.getItem('losteapy_user')
  let isAdmin = false

  try {
    const user = userRaw ? JSON.parse(userRaw) : null
    isAdmin = !!user?.is_admin || user?.email === 'Admin'
  } catch {
    isAdmin = false
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
  const guestOnly = to.matched.some(record => record.meta.guestOnly)

  if (requiresAuth && !token) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }

  if (requiresAdmin && !isAdmin) {
    return {
      path: '/login',
      query: { redirect: to.fullPath, admin: '1' },
    }
  }

  if (guestOnly && token) {
    return '/'
  }

  return true
})

export default router
