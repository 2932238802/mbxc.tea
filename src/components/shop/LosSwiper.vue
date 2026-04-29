<!-- 
大标题
- class="swiper los-swiper"
  - 这个表示当前元素同时拥有 swiper 和 los-swiper 两个类名
-->

<template>
  <div class="swiper los-swiper">
    <div class="swiper-wrapper">
      <div
        v-for="slide in slides"
        :key="slide.title"
        class="swiper-slide hero-slide"
        :style="{ backgroundImage: `url(${slide.image})`, backgroundPosition: slide.position || 'center' }"
      >
        <div class="hero-overlay"></div>

        <div class="hero-content">
          <div class="hero-kicker">
            <span class="hero-kicker-dot"></span>
            {{ slide.kicker }}
          </div>
          <h1 class="hero-title" v-html="slide.title"></h1>
          <p class="hero-subtitle">{{ slide.subtitle }}</p>
          <div class="hero-actions">
            <router-link :to="slide.link" class="hero-primary-btn">
              {{ slide.button }}
              <i class="fas fa-arrow-right ms-2"></i>
            </router-link>
            <router-link to="/culture" class="hero-secondary-btn">
              了解茶文旅
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="swiper-pagination los-swiper-pagination"></div>
  </div>
</template>

<!------------------------------------------>

<script setup lang="ts">
import { assetUrl } from '@/utils/asset'
import { onMounted, onUnmounted } from 'vue'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

let LosSwiper: Swiper | null = null

const slides = [
  {
    image: assetUrl('封面.jpg'),
    kicker: '安顶山云雾茶数字焕新',
    title: '安顶山茶产业互联网<br>综合服务平台',
    subtitle: '整合全产业链资源 · 赋能数字农业 · 助力乡村振兴',
    button: '进入云雾茶交易中心',
    link: '/market',
  },
  {
    image: assetUrl('数字2.jpg'),
    position: 'center 32%',
    kicker: '数字茶园示范基地',
    title: '天空地一体化监测<br>驱动智慧茶园管理',
    subtitle: '物联网感知 · AI 农事建议 · 茶园长势监测',
    button: '查看茶产业',
    link: '/industry',
  },
  {
    image: assetUrl('碳汇.jpg'),
    kicker: '低碳农业与绿色资产',
    title: '茶园碳汇资产管理<br>释放生态价值',
    subtitle: '绿色种植 · 碳汇核算 · 产业价值转化',
    button: '了解茶碳汇',
    link: '/carbon',
  },
]

/**
 * loop 
 * - 开启循环
 * disableOnInteraction 
 * - 用户手动操作轮播图之后，自动播放是否停止
 * - 选择false是对的 这样 就可以一直播放
 * pagination 
 * - .los-swiper-pagination 
 * - 这个是分页点
 */
onMounted(() => {
  LosSwiper = new Swiper('.los-swiper', {
    loop: true,
    speed: 850,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.los-swiper-pagination',
      clickable: true,
    },
  })
})

/**
 * destroy(true, true)
 * - deleteInstance = true
 * - cleanStyles = true
 * - 清理掉实例本身 还有清理掉对应的引用和样式
 */
onUnmounted(() => {
  LosSwiper?.destroy(true, true)
  LosSwiper = null
})
</script>

<!------------------------------------------>

<style scoped>
.los-swiper {
  height: 560px;
  overflow: hidden;
  border-bottom: none;
  background: #0b2418;
}

.hero-slide {
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-slide::after {
  content: '';
  position: absolute;
  inset: auto 0 0;
  height: 42%;
  background: linear-gradient(180deg, rgba(5, 18, 10, 0), rgba(5, 18, 10, 0.34));
  pointer-events: none;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 36%, rgba(255, 255, 255, 0.18), transparent 24%),
    linear-gradient(90deg, rgba(2, 36, 17, 0.34), rgba(0, 64, 32, 0.12) 45%, rgba(2, 36, 17, 0.32)),
    linear-gradient(180deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.06));
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 920px;
  padding: 44px 48px;
  border-radius: 28px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.10));
  border: 1px solid rgba(255, 255, 255, 0.28);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.20);
  backdrop-filter: blur(10px);
}

.hero-kicker {
  width: fit-content;
  margin: 0 auto 18px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: 1px;
}

.hero-kicker-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #a7f3c3;
  box-shadow: 0 0 0 5px rgba(167, 243, 195, 0.16);
}

.hero-title {
  font-size: clamp(2.6rem, 5vw, 5rem);
  font-weight: 950;
  line-height: 1.12;
  margin-bottom: 20px;
  letter-spacing: 3px;
  text-shadow: 0 5px 22px rgba(0, 0, 0, 0.38);
}

.hero-subtitle {
  font-size: clamp(1rem, 1.6vw, 1.35rem);
  margin: 0 auto 34px;
  max-width: 720px;
  opacity: 0.94;
  line-height: 1.9;
  font-weight: 600;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.34);
}

.hero-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.hero-primary-btn,
.hero-secondary-btn {
  min-width: 180px;
  padding: 12px 26px;
  border-radius: 999px;
  font-weight: 900;
  text-decoration: none;
  transition: all 0.22s ease;
}

.hero-primary-btn {
  color: #fff;
  background: linear-gradient(135deg, #008d52, #12b76a);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: 0 12px 28px rgba(0, 104, 59, 0.34);
}

.hero-primary-btn:hover {
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 16px 34px rgba(0, 104, 59, 0.45);
}

.hero-secondary-btn {
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.34);
}

.hero-secondary-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

:deep(.swiper-pagination) {
  bottom: 24px !important;
}

:deep(.swiper-pagination-bullet) {
  width: 9px;
  height: 9px;
  background: rgba(255, 255, 255, 0.82);
  opacity: 1;
  transition: all 0.22s ease;
}

:deep(.swiper-pagination-bullet-active) {
  width: 34px;
  border-radius: 999px;
  background: #12b76a;
  box-shadow: 0 0 0 5px rgba(18, 183, 106, 0.18);
}

@media (max-width: 768px) {
  .los-swiper {
    height: 520px;
  }

  .hero-content {
    width: calc(100% - 32px);
    padding: 32px 22px;
    border-radius: 22px;
  }

  .hero-title {
    letter-spacing: 1px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-primary-btn,
  .hero-secondary-btn {
    width: 100%;
  }
}
</style>
