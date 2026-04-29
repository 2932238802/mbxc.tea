<template>
  <Layout>
    <MeteorPage
      kicker="绿色价值 · 碳汇资产"
      title="茶碳汇"
      subtitle="以安顶山数字茶园为基础，围绕茶园固碳、
      绿色种植、低碳加工与碳汇资产管理，探索茶产业绿色价值转化路径"
      :stats="stats"
      :bg-image="assetUrl('总览.jpg')"
    >
      <div class="carbon-page">
        <section class="carbon-content">
          <div class="row align-items-center g-4 mb-5">
            <div class="col-lg-5">
              <div class="carbon-card h-100">
                <h3 class="fw-bold mb-3"><span class="title-mark">{{ visualIcon('carbon') }}</span> 茶园碳汇价值</h3>
                <p class="text-muted mb-4">
                  农业是重要的温室气体排放源之一，同时也具备巨大的碳汇能力安顶山茶园植被覆盖率高、茶树树冠覆盖面积大，具备长期固碳与生态价值沉淀能力
                </p>
                <div class="d-flex flex-column gap-2">
                  <div class="carbon-tag"><span class="tag-mark">✓</span> 政府承诺：2030碳达峰 / 2060碳中和</div>
                  <div class="carbon-tag"><span class="tag-mark">✓</span> 产业优势：产业链长、数字化基础好</div>
                  <div class="carbon-tag"><span class="tag-mark">✓</span> 社会价值：绿色转型与乡村振兴联动</div>
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

          <div class="row g-4 mb-4">
            <div class="col-md-4" v-for="item in abilities" :key="item.title">
              <div class="ability-card h-100">
                <div class="ability-icon"><span class="visual-mark">{{ visualIcon(item.visual) }}</span></div>
                <h5>{{ item.title }}</h5>
                <p>{{ item.desc }}</p>
              </div>
            </div>
          </div>

          <div class="row g-4">
            <div class="col-md-3" v-for="metric in metrics" :key="metric.label">
              <div class="metric-card">
                <strong>{{ metric.value }}</strong>
                <span>{{ metric.label }}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MeteorPage>
  </Layout>
</template>

<script setup lang="ts">
import { assetUrl } from '@/utils/asset'
import { visualIcon, type VisualKey } from '@/utils/visual'
import Layout from '@/components/shop/LosLayout.vue'
import MeteorPage from '@/components/shared/LosMeteorPage.vue'

const stats = [
  { value: '2030', label: '碳达峰' },
  { value: '2060', label: '碳中和' },
  { value: '闭环', label: '绿色资产' },
]

const abilities: Array<{ title: string; visual: VisualKey; desc: string }> = [
  {
    title: '数字化监测',
    visual: 'sensor',
    desc: '通过物联网设备采集土壤、气象、虫情与茶园长势数据，为碳汇核算提供可信基础',
  },
  {
    title: '绿色种植',
    visual: 'leaf',
    desc: '优化施肥、灌溉与病虫害管理，减少农业投入品浪费，提升茶园生态系统稳定性',
  },
  {
    title: '碳资产管理',
    visual: 'carbon',
    desc: '沉淀茶园碳汇数据资产，支持碳减排评估、绿色品牌传播和未来交易场景对接',
  },
]

const metrics = [
  { value: '种植', label: '低碳农事记录' },
  { value: '加工', label: '能耗过程优化' },
  { value: '物流', label: '绿色履约链路' },
  { value: '交易', label: '碳汇价值转化' },
]
</script>

<style scoped>
.carbon-page {
  min-height: 100vh;
}

.carbon-content {
  position: relative;
  z-index: 1;
}

.carbon-card,
.ability-card,
.metric-card {
  background: var(--tea-surface-soft);
  border: 1px solid var(--tea-border);
  border-radius: 18px;
  padding: 28px;
  box-shadow: var(--tea-shadow);
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
  background: var(--tea-primary-soft);
  color: var(--tea-primary);
  padding: 7px 14px;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 700;
}

.title-mark,
.tag-mark,
.visual-mark {
  line-height: 1;
  font-weight: 900;
}

.tag-mark {
  margin-right: 4px;
}

.section-title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid var(--tea-border);
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

.ability-card,
.metric-card {
  transition: all .25s ease;
}

.ability-card:hover,
.metric-card:hover {
  transform: translateY(-4px);
  border-color: var(--tea-primary);
}

.ability-icon {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--tea-primary-soft);
  color: var(--tea-primary);
  font-size: 1.4rem;
  margin-bottom: 16px;
}

.ability-card h5 {
  color: var(--tea-text);
  font-weight: 800;
}

.ability-card p {
  color: var(--tea-text-muted);
  line-height: 1.8;
  margin-bottom: 0;
}

.metric-card {
  text-align: center;
}

.metric-card strong {
  display: block;
  color: var(--tea-primary);
  font-size: 1.55rem;
  margin-bottom: 8px;
}

.metric-card span {
  color: var(--tea-text-muted);
  font-weight: 700;
}
</style>
