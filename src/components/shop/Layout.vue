<template>
  <main class="shop-page">
    <ShopNavbar />
    <div class="page-offset">
      <slot />
    </div>
    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import ShopNavbar from '@/components/shop/ShopNavbar.vue'
import AppFooter from '@/components/shop/AppFooter.vue'
</script>

<style scoped>
.shop-page {
  min-height: 100vh;
  background-image: linear-gradient(rgba(252, 252, 252, 0.86), rgba(252, 252, 252, 0.86)), url('/总览.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
.page-offset {
  padding-top: 76px;
  min-height: calc(100vh - 76px);
}
</style>
