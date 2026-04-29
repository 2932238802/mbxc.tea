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
      <div class="navbar-actions d-flex align-items-center gap-2">
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
          <router-link v-if="authStore.isAdmin" to="/dashboard" class="btn btn-outline-success rounded-pill px-3 dashboard-entry">
            <i class="fas fa-chart-pie me-1"></i>数据看板
          </router-link>
        </template>

        <template v-else>
          <router-link to="/login" class="btn btn-success rounded-pill px-3">
            登录 / 注册
          </router-link>
        </template>

        <a
          href="https://github.com/2932238802/LosTeaWeb"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-outline-success rounded-pill px-3 source-entry"
        >
          <i class="fab fa-github me-1"></i>访问源码
        </a>

        <button class="btn btn-outline-success rounded-pill position-relative px-3 cart-btn" @click="openCart">
          <i class="fas fa-shopping-cart me-1"></i>购物车
          <span class="cart-count-badge">
            {{ cartStore.totalCount > 99 ? '99+' : cartStore.totalCount }}
          </span>
        </button>
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
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  white-space: nowrap;
  flex: 0 0 auto;
}

.brand-logo-img {
  width: 36px;
  height: 36px;
  object-fit: contain;
  border-radius: 10px;
}

.brand-user {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: 10px;
  padding: 4px 12px;
  border-radius: 999px;
  background: var(--tea-primary-soft);
  color: var(--tea-primary);
  font-size: .82rem;
  font-weight: 700;
  letter-spacing: 0;
  max-width: 220px;
  overflow: hidden;
}

.brand-user .brand-user-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: .82rem;
  font-weight: 700;
}

@media (max-width: 1200px) {
  .brand-user {
    display: none;
  }
}

.nav-link {
  color: var(--tea-text) !important;
  font-weight: 500;
  margin: 0 7px;
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

.cart-btn {
  overflow: visible;
}

.cart-count-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #dc3545;
  border: 2px solid var(--tea-navbar-bg);
  font-size: 0.68rem;
  font-weight: 900;
  line-height: 1;
  box-shadow: 0 4px 10px rgba(220, 53, 69, 0.28);
  transform: scale(1);
  transform-origin: center;
}

.cart-count-badge:empty {
  display: none;
}

.theme-toggle {
  min-width: 62px;
  height: 36px;
  border: 1px solid var(--tea-border);
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0 10px;
  color: var(--tea-primary);
  background: var(--tea-surface);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  font-size: 0.82rem;
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
  max-width: 150px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0 11px;
  color: var(--tea-primary);
  background: var(--tea-primary-soft);
  font-size: 0.82rem;
  font-weight: 700;
  white-space: nowrap;
}

.user-chip span {
  overflow: hidden;
  text-overflow: ellipsis;
}

.navbar-actions .btn {
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  white-space: nowrap;
  font-size: 0.88rem;
}

@media (max-width: 1400px) {
  .navbar-brand { font-size: 1.35rem; }
  .brand-logo-img { width: 34px; height: 34px; }
  .nav-link { margin: 0 5px; font-size: 0.92rem; }
  .navbar-actions .btn { padding-left: 0.7rem !important; padding-right: 0.7rem !important; }
  .user-chip { max-width: 130px; }
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
