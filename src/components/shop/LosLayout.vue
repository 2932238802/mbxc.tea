<template>
  <main class="shop-page">
    <ShopNavbar />
    <CartModal />
    <div class="page-offset">
      <slot />
    </div>
    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import ShopNavbar from '@/components/shop/LosShopNavbar.vue'
import AppFooter from '@/components/shop/LosAppFooter.vue'
import CartModal from '@/components/shop/LosCartModal.vue'
</script>

<style scoped>
.shop-page {
  min-height: 100vh;
  color: var(--tea-text);
  background:
    linear-gradient(rgba(247, 252, 249, 0.72), rgba(247, 252, 249, 0.72)),
    url('/总览.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  transition: color .2s ease, background-color .2s ease;
}

:root[data-theme="dark"] .shop-page {
  background:
    linear-gradient(rgba(8, 18, 13, 0.82), rgba(8, 18, 13, 0.82)),
    url('/总览.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
.page-offset {
  padding-top: 58px;
  min-height: calc(100vh - 58px);
}
</style>
