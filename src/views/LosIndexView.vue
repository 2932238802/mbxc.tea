
<!-- 
<HeroSwiper />
- 这个就是大标题
-  

<div class="col-md-4" v-for="item in modules" :key="item.path">
- 这里的model 就是 我们项目的 主要几个模块

-->
<template>
  <Layout>
    <HeroSwiper />
    <div class="container py-5">

      <section class="intro-section mb-5">
        <div class="row align-items-center g-4">
          <div class="col-lg-6">
            <div class="intro-card h-100">
              <span class="badge bg-success rounded-pill px-3 py-2 mb-3">安顶山云雾茶</span>
              <h2 class="fw-bold text-success mb-3">一站式茶产业互联网综合服务平台</h2>
              <p class="text-muted mb-4">
                茗不虚传整合茶文旅、数字茶园、茶科技、供应链服务、茶碳汇和云端交易能力，打造面向消费者、茶企与产业管理者的数字化服务入口
              </p>
              <div class="d-flex flex-wrap gap-2">
                <router-link to="/culture" class="btn btn-success rounded-pill px-4">体验茶文旅</router-link>
                <router-link to="/market" class="btn btn-outline-success rounded-pill px-4">进入交易中心</router-link>
                <router-link to="/dashboard" class="btn btn-outline-secondary rounded-pill px-4">查看产业大脑</router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <img :src="assetUrl('茶叶.jpg')" class="img-fluid rounded shadow intro-img" alt="安顶云雾茶">
          </div>
        </div>
      </section>

      <section class="quick-nav mb-5">
        <div class="section-title-wrapper">
          <h2 class="section-title">核心模块</h2>
          <span class="text-muted small">点击进入独立页面</span>
        </div>
        <div class="row g-4">
          <div class="col-md-4" v-for="item in modules" :key="item.path">
            <router-link :to="item.path" class="module-card">
              <div class="module-icon"><i :class="['fas', item.icon]"></i></div>
              <h5>{{ item.title }}</h5>
              <p>{{ item.desc }}</p>
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { assetUrl } from '@/utils/asset'
import Layout from '@/components/shop/LosLayout.vue'
import HeroSwiper from '@/components/shop/LosSwiper.vue'

const modules = [
  { path: '/culture', title: '茶文旅', icon: 'fa-mountain-sun', desc: '采茶、炒茶、研学与景区体验预约' },
  { path: '/industry', title: '茶产业', icon: 'fa-seedling', desc: '数字茶园与未来茶场产业能力展示' },
  { path: '/tech', title: '茶科技', icon: 'fa-microchip', desc: '溯源秤、茶标机、智能硬件与茶园元宇宙' },
  { path: '/service', title: '茶服务', icon: 'fa-bullhorn', desc: '品牌营销、市场调研与供应链金融' },
  { path: '/carbon', title: '茶碳汇', icon: 'fa-tree', desc: '茶园碳汇价值、绿色资产与交易案例' },
  { path: '/market', title: '交易中心', icon: 'fa-bag-shopping', desc: '云雾茶预定与茶小泽文创周边购买' },
]
</script>

<style scoped>
.intro-card {
  background: rgba(255,255,255,0.92);
  border-radius: 18px;
  padding: 34px;
  box-shadow: 0 12px 28px rgba(0,0,0,0.08);
}
.intro-img {
  width: 100%;
  max-height: 390px;
  object-fit: cover;
}
.section-title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--tea-primary);
  position: relative;
  padding-left: 15px;
}
.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 25px;
  background-color: var(--tea-primary);
  border-radius: 2px;
}
.module-card {
  display: block;
  height: 100%;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 16px;
  padding: 24px;
  color: inherit;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(0,0,0,0.04);
  transition: all .25s ease;
}
.module-card:hover {
  transform: translateY(-4px);
  border-color: var(--tea-primary);
  box-shadow: 0 12px 26px rgba(0,0,0,0.08);
}
.module-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(0,104,59,.1);
  color: var(--tea-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  margin-bottom: 16px;
}
.module-card h5 {
  font-weight: 800;
  color: #1b4d24;
}
.module-card p {
  color: #777;
  margin-bottom: 0;
  line-height: 1.7;
}
</style>
