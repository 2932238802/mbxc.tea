<template>
  <Layout>
    <div class="carbon-page">
      <section class="page-hero">
        <div class="container">
          <span class="badge bg-success rounded-pill px-3 py-2 mb-3">绿水青山就是金山银山</span>
          <h1 class="page-title">茶碳汇</h1>
          <p class="page-subtitle">
            以安顶山数字茶园为基础，围绕茶园固碳、绿色种植、低碳加工与碳汇资产管理，探索茶产业绿色价值转化路径
          </p>
        </div>
      </section>

      <section class="container py-5">
        <div class="row align-items-center g-4 mb-5">
          <div class="col-lg-5">
            <div class="carbon-card h-100">
              <h3 class="fw-bold mb-3"><i class="fas fa-tree text-success me-2"></i>茶园碳汇价值</h3>
              <p class="text-muted mb-4">
                农业是重要的温室气体排放源之一，同时也具备巨大的碳汇能力安顶山茶园植被覆盖率高、茶树树冠覆盖面积大，具备长期固碳与生态价值沉淀能力
              </p>
              <div class="d-flex flex-column gap-2">
                <div class="carbon-tag"><i class="fas fa-check-circle me-1"></i> 政府承诺：2030碳达峰 / 2060碳中和</div>
                <div class="carbon-tag"><i class="fas fa-check-circle me-1"></i> 产业优势：产业链长、数字化基础好</div>
                <div class="carbon-tag"><i class="fas fa-check-circle me-1"></i> 社会价值：绿色转型与乡村振兴联动</div>
              </div>
              <button class="btn btn-success rounded-pill mt-4 px-4">查看碳汇交易案例</button>
            </div>
          </div>
          <div class="col-lg-7">
            <img :src="assetUrl('碳汇.jpg')" class="img-fluid rounded shadow carbon-img" alt="茶碳汇">
          </div>
        </div>

        <div class="section-title-wrapper">
          <h2 class="section-title">低碳能力地图</h2>
          <span class="text-muted small">从种植、加工到交易的绿色闭环</span>
        </div>

        <div class="row g-4">
          <div class="col-md-4" v-for="item in abilities" :key="item.title">
            <div class="ability-card h-100">
              <div class="ability-icon"><i :class="['fas', item.icon]"></i></div>
              <h5>{{ item.title }}</h5>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { assetUrl } from '@/utils/asset'
import Layout from '@/components/shop/LosLayout.vue'

const abilities = [
  {
    title: '数字化监测',
    icon: 'fa-satellite-dish',
    desc: '通过物联网设备采集土壤、气象、虫情与茶园长势数据，为碳汇核算提供可信基础',
  },
  {
    title: '绿色种植',
    icon: 'fa-leaf',
    desc: '优化施肥、灌溉与病虫害管理，减少农业投入品浪费，提升茶园生态系统稳定性',
  },
  {
    title: '碳资产管理',
    icon: 'fa-chart-line',
    desc: '沉淀茶园碳汇数据资产，支持碳减排评估、绿色品牌传播和未来交易场景对接',
  },
]
</script>

<style scoped>
.carbon-page {
  min-height: 100vh;
}
.page-hero {
  background: linear-gradient(135deg, rgba(0,104,59,.92), rgba(46,125,50,.82));
  background-size: cover;
  background-position: center;
  color: #fff;
  padding: 72px 0;
}
.page-title {
  font-size: 3rem;
  font-weight: 900;
  letter-spacing: 2px;
  margin-bottom: 14px;
}
.page-subtitle {
  max-width: 760px;
  font-size: 1.1rem;
  line-height: 1.9;
  opacity: .92;
  margin-bottom: 0;
}
.carbon-card,
.ability-card {
  background: rgba(255,255,255,.94);
  border: 1px solid rgba(0,104,59,.08);
  border-radius: 18px;
  padding: 28px;
  box-shadow: 0 12px 28px rgba(0,0,0,.07);
}
.carbon-img {
  width: 100%;
  max-height: 430px;
  object-fit: cover;
}
.carbon-tag {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  background: rgba(0, 104, 59, 0.1);
  color: var(--tea-primary);
  padding: 7px 14px;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 700;
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
  font-weight: 800;
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
.ability-card {
  transition: all .25s ease;
}
.ability-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 34px rgba(0,0,0,.1);
}
.ability-icon {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,104,59,.1);
  color: var(--tea-primary);
  font-size: 1.4rem;
  margin-bottom: 16px;
}
.ability-card h5 {
  color: #1b4d24;
  font-weight: 800;
}
.ability-card p {
  color: #777;
  line-height: 1.8;
  margin-bottom: 0;
}
</style>
