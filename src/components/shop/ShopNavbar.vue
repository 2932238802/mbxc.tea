<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <img src="/logo.jpg" alt="Logo" class="brand-logo-img">
        茗不虚传
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link active" href="#">首页</a></li>
          <li class="nav-item"><a class="nav-link" href="#culture">茶文旅</a></li>
          <li class="nav-item"><a class="nav-link" href="#industry">茶产业</a></li>
          <li class="nav-item"><a class="nav-link" href="#tech">茶科技</a></li>
          <li class="nav-item"><a class="nav-link" href="#service">茶服务</a></li>
          <li class="nav-item"><a class="nav-link" href="#carbon">茶碳汇</a></li>
          <li class="nav-item"><a class="nav-link" href="#market">交易中心</a></li>
        </ul>
      </div>
      <div class="d-flex align-items-center gap-3">
        <div class="btn-search"><i class="fas fa-search"></i> <span>搜索</span></div>
        <button class="btn btn-outline-success rounded-pill position-relative px-3"
          @click="cartStore.totalCount && openCart()">
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

import { useCartStore } from '@/stores/cart'


const cartStore = useCartStore()

function openCart() {
  const event = new CustomEvent('open-cart')
  window.dispatchEvent(event)
}


</script>




















<style scoped>
.navbar {
  background-color: white !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 10px 0;
}

.navbar-nav {
  flex-wrap: nowrap;
}

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
  color: #333 !important;
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

.btn-search i {
  margin-right: 8px;
}
</style>
