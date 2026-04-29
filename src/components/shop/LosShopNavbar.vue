<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <img :src="assetUrl('logo.jpg')" alt="Logo" class="brand-logo-img">
        茗不虚传
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" exact-active-class="active" to="/">首页</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/culture">茶文旅</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/industry">茶产业</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/tech">茶科技</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/service">茶服务</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/carbon">茶碳汇</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/market">交易中心</router-link>
          </li>
        </ul>
      </div>
      <div class="navbar-actions d-flex align-items-center gap-3">
        <button class="theme-toggle" type="button" :title="themeStore.isDark ? '切换到亮色主题' : '切换到暗色主题'" @click="themeStore.toggleTheme">
          <i :class="['fas', themeStore.isDark ? 'fa-sun' : 'fa-moon']"></i>
          <span>{{ themeStore.isDark ? '亮色' : '暗色' }}</span>
        </button>

        <template v-if="authStore.isLoggedIn">
          <div class="user-chip" :title="authStore.displayName">
            <i class="fas fa-user-circle me-1"></i>
            <span>{{ authStore.displayName }}</span>
          </div>
          <button class="btn btn-outline-secondary rounded-pill px-3" @click="handleLogout">
            退出
          </button>
        </template>

        <template v-else>
          <router-link to="/login" class="btn btn-success rounded-pill px-3">
            登录 / 注册
          </router-link>
        </template>

        <button class="btn btn-outline-success rounded-pill position-relative px-3" @click="openCart">
          <i class="fas fa-shopping-cart me-1"></i>购物车
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            v-if="cartStore.totalCount">{{ cartStore.totalCount }}</span>
        </button>
        <router-link to="/dashboard" class="btn btn-outline-success rounded-pill px-3">
          <i class="fas fa-chart-pie me-1"></i>产业大脑
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { assetUrl } from '@/utils/asset'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()
const themeStore = useThemeStore()

function openCart() {
  const event = new CustomEvent('open-cart')
  window.dispatchEvent(event)
}

function handleLogout() {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.navbar {
  background-color: var(--tea-navbar-bg) !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid var(--tea-border);
  backdrop-filter: blur(12px);
  padding: 10px 0;
}

.navbar-nav { flex-wrap: nowrap; }

.navbar-brand {
  color: var(--tea-primary) !important;
  font-weight: 800;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.brand-logo-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 10px;
}

.nav-link {
  color: var(--tea-text) !important;
  font-weight: 500;
  margin: 0 10px;
  position: relative;
  padding-bottom: 5px;
  transition: color 0.3s;
  white-space: nowrap;
}

.nav-link:hover,
.nav-link.active {
  color: var(--tea-primary) !important;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background-color: var(--tea-primary);
  border-radius: 2px;
}

.btn-search {
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  color: #888;
  background: #fff;
  white-space: nowrap;
  cursor: pointer;
}
.btn-search i { margin-right: 8px; }

.theme-toggle {
  min-width: 76px;
  height: 38px;
  border: 1px solid var(--tea-border);
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0 12px;
  color: var(--tea-primary);
  background: var(--tea-surface);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  font-size: 0.86rem;
  font-weight: 700;
  white-space: nowrap;
  transition: transform .2s ease, color .2s ease, background-color .2s ease, border-color .2s ease;
}

.theme-toggle:hover {
  transform: translateY(-1px);
  color: var(--tea-surface);
  background: var(--tea-primary);
  border-color: var(--tea-primary);
}

.user-chip {
  max-width: 180px;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 6px 12px;
  color: var(--tea-primary);
  background: var(--tea-primary-soft);
  font-size: 0.9rem;
  font-weight: 700;
  white-space: nowrap;
}

.user-chip span {
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 1200px) {
  .navbar-actions {
    gap: 0.5rem !important;
  }

  .theme-toggle {
    min-width: 38px;
    padding: 0;
  }

  .btn-search span,
  .theme-toggle span,
  .user-chip span {
    display: none;
  }
}
</style>
