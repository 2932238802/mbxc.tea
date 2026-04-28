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
import ShopNavbar from '@/components/shop/LosShopNavbar.vue'
import AppFooter from '@/components/shop/LosAppFooter.vue'
</script>

<style scoped>
.shop-page {
  min-height: 100vh;
  background-color: #f7fcf9;
}
.page-offset {
  padding-top: 76px;
  min-height: calc(100vh - 76px);
}
</style>
