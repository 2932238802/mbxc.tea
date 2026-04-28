<template>
  <div class="swiper hero-swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide hero-slide" style="background-image: url('/封面.jpg')">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1 class="hero-title">安顶山茶产业互联网<br>综合服务平台</h1>
          <p class="hero-subtitle">整合全产业链资源 · 赋能数字农业 · 助力乡村振兴</p>
          <a href="#market" class="btn btn-success btn-lg rounded-pill px-5">进入云雾茶交易中心</a>
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

let heroSwiper: Swiper | null = null

onMounted(() => {
  heroSwiper = new Swiper('.hero-swiper', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  })
})

onUnmounted(() => {
  heroSwiper?.destroy(true, true)
  heroSwiper = null
})
</script>

<style scoped>
.hero-swiper { height: 500px; margin-top: 76px; }
.hero-slide {
  background-size: cover; background-position: center;
  display: flex; align-items: center; justify-content: center;
  color: white; text-align: center; position: relative;
}
.hero-overlay {
  position: absolute; inset: 0; background: rgba(0, 50, 20, 0.4);
}
.hero-content { position: relative; z-index: 2; max-width: 800px; }
.hero-title {
  font-size: 3.5rem; font-weight: 800; margin-bottom: 20px;
  letter-spacing: 2px; text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}
.hero-subtitle {
  font-size: 1.2rem; margin-bottom: 40px; opacity: 0.9;
  text-shadow: 0 1px 5px rgba(0,0,0,0.3);
}
</style>
