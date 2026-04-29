<template>
  <aside class="sidebar d-none d-md-flex">
    <router-link to="/" class="brand-logo">
      <img class="brand-logo-img" :src="assetUrl('logo.jpg')" alt="Logo">
      <span>茗不虚传</span>
    </router-link>

    <div class="sidebar-label">产业运营中枢</div>

    <nav class="sidebar-nav">
      <a class="nav-link active" href="#"><i class="fas fa-chart-pie"></i> 数据总览</a>
    </nav>

    <div class="sidebar-card">
      <i class="fas fa-leaf"></i>
      <strong>安顶山云雾茶</strong>
      <span>产业数据每日自动汇总</span>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { assetUrl } from '@/utils/asset'
</script>

<style scoped>
.sidebar {
  height: 100vh;
  position: sticky;
  top: 0;
  z-index: 100;
  flex-direction: column;
  padding: 18px 14px;
  background: rgba(255, 255, 255, 0.84);
  border-right: 1px solid rgba(0, 104, 59, 0.08);
  box-shadow: 8px 0 40px rgba(0, 104, 59, 0.05);
  backdrop-filter: blur(18px);
}

.brand-logo {
  min-height: 58px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
  color: var(--tea-primary);
  font-weight: 950;
  font-size: 1.5rem;
  text-decoration: none;
}

.brand-logo-img {
  width: 38px;
  height: 38px;
  object-fit: contain;
  border-radius: 12px;
}

.sidebar-label {
  margin: 12px 12px 10px;
  color: #7b8a81;
  font-size: .78rem;
  font-weight: 900;
  letter-spacing: .08em;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nav-link {
  min-height: 46px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 14px;
  border-radius: 16px;
  color: #5e6d64;
  font-weight: 800;
  text-decoration: none;
  transition: all .22s ease;
}

.nav-link i {
  width: 22px;
  text-align: center;
  font-size: 1.04rem;
}

.nav-link:hover,
.nav-link.active {
  color: var(--tea-primary);
  background: rgba(0, 104, 59, 0.10);
  transform: translateX(2px);
}

.sidebar-card {
  margin-top: auto;
  padding: 18px;
  border-radius: 22px;
  color: #fff;
  background:
    linear-gradient(135deg, rgba(0, 104, 59, .94), rgba(18, 183, 106, .74)),
    url('/茶叶.jpg') center / cover;
  box-shadow: 0 18px 40px rgba(0, 104, 59, .18);
}

.sidebar-card i {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.18);
  margin-bottom: 12px;
}

.sidebar-card strong,
.sidebar-card span {
  display: block;
}

.sidebar-card strong { font-size: 1rem; }
.sidebar-card span { margin-top: 5px; color: rgba(255, 255, 255, .82); font-size: .78rem; }
</style>
