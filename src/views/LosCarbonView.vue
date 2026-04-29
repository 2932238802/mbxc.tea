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
                <button class="btn btn-success rounded-pill mt-4 px-4" @click="showCarbonCase = true">查看碳汇交易案例</button>
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
      <Teleport to="body">
        <div v-if="showCarbonCase" class="modal fade show d-block carbon-case-modal" tabindex="-1">
          <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content carbon-case-content">
              <div class="modal-header carbon-case-header">
                <div>
                  <span class="case-kicker">Carbon Trading Flow</span>
                  <h5 class="modal-title fw-bold mt-1">安顶山茶园碳汇交易流程图</h5>
                </div>
                <button type="button" class="btn-close" @click="showCarbonCase = false"></button>
              </div>
              <div class="modal-body">
                <div class="case-summary-grid mb-4">
                  <div class="case-summary-card">
                    <strong>350亩</strong>
                    <span>核心茶园面积</span>
                  </div>
                  <div class="case-summary-card">
                    <strong>120 tCO₂e</strong>
                    <span>预计年度碳汇量</span>
                  </div>
                  <div class="case-summary-card">
                    <strong>¥28,000</strong>
                    <span>示范交易价值</span>
                  </div>
                </div>

                <div class="carbon-flow">
                  <div class="flow-step" v-for="(step, index) in carbonFlow" :key="step.title">
                    <div class="flow-icon"><span>{{ step.icon }}</span></div>
                    <h6>{{ step.title }}</h6>
                    <p>{{ step.desc }}</p>
                    <div v-if="index < carbonFlow.length - 1" class="flow-arrow">
                      <i class="fas fa-arrow-right"></i>
                    </div>
                  </div>
                </div>

                <div class="case-note mt-4">
                  <div class="case-note-icon">✓</div>
                  <div>
                    <strong>绿色价值转化说明</strong>
                    <p>通过数字茶园采集、碳汇核算、资产登记和企业认购，将茶园生态价值转化为可展示、可评估、可交易的绿色资产</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-backdrop fade show carbon-case-backdrop" @click="showCarbonCase = false"></div>
        </div>
      </Teleport>
    </MeteorPage>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { assetUrl } from '@/utils/asset'
import { visualIcon, type VisualKey } from '@/utils/visual'
import Layout from '@/components/shop/LosLayout.vue'
import MeteorPage from '@/components/shared/LosMeteorPage.vue'

const showCarbonCase = ref(false)

const carbonFlow = [
  { icon: '📡', title: '数字茶园采集', desc: '采集茶园面积、气象、土壤、长势和绿色农事记录' },
  { icon: '🧮', title: '碳汇核算', desc: '基于茶树覆盖、植被固碳和低碳生产形成核算结果' },
  { icon: '📄', title: '资产登记', desc: '沉淀碳汇数据档案，形成可追溯的绿色资产台账' },
  { icon: '🤝', title: '企业认购', desc: '对接低碳采购、公益认购和品牌绿色营销场景' },
  { icon: '🌱', title: '品牌披露', desc: '输出低碳证明、传播素材和绿色价值展示内容' },
]

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

.carbon-case-modal {
  z-index: 3005;
}

.carbon-case-modal .modal-dialog {
  pointer-events: auto;
  z-index: 3010;
}

.carbon-case-content {
  overflow: hidden;
  border: 1px solid rgba(0, 104, 59, 0.12);
  border-radius: 28px;
  color: var(--tea-text);
  background:
    radial-gradient(circle at 16% 8%, rgba(18, 183, 106, 0.16), transparent 28%),
    var(--tea-surface);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.34);
}

.carbon-case-header {
  border-color: var(--tea-border);
  padding: 22px 26px;
  background: rgba(255, 255, 255, 0.72);
}

.case-kicker {
  display: inline-flex;
  padding: 5px 12px;
  border-radius: 999px;
  color: var(--tea-primary);
  background: var(--tea-primary-soft);
  font-size: .78rem;
  font-weight: 900;
}

.case-summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.case-summary-card {
  padding: 18px;
  border-radius: 20px;
  text-align: center;
  border: 1px solid var(--tea-border);
  background: rgba(255, 255, 255, 0.82);
}

.case-summary-card strong {
  display: block;
  color: var(--tea-primary);
  font-size: 1.45rem;
  font-weight: 950;
}

.case-summary-card span {
  display: block;
  margin-top: 6px;
  color: var(--tea-text-muted);
  font-weight: 800;
  font-size: .86rem;
}

.carbon-flow {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
  align-items: stretch;
}

.flow-step {
  position: relative;
  min-height: 210px;
  padding: 20px 16px;
  border: 1px solid var(--tea-border);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 12px 28px rgba(0, 104, 59, 0.08);
}

.flow-icon {
  width: 52px;
  height: 52px;
  margin-bottom: 14px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: var(--tea-primary-soft);
  font-size: 1.45rem;
}

.flow-step h6 {
  color: var(--tea-primary);
  font-weight: 900;
}

.flow-step p {
  margin: 0;
  color: var(--tea-text-muted);
  line-height: 1.75;
  font-size: .88rem;
}

.flow-arrow {
  position: absolute;
  top: 46%;
  right: -18px;
  z-index: 2;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  color: #fff;
  background: var(--tea-primary);
  box-shadow: 0 8px 18px rgba(0, 104, 59, 0.22);
}

.case-note {
  display: flex;
  gap: 14px;
  padding: 18px;
  border-radius: 22px;
  color: var(--tea-primary);
  background: var(--tea-primary-soft);
}

.case-note-icon {
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  color: #fff;
  background: var(--tea-primary);
  font-weight: 900;
}

.case-note p {
  margin: 4px 0 0;
  color: var(--tea-text-muted);
  line-height: 1.75;
}

.carbon-case-backdrop {
  z-index: 2995;
  opacity: .58 !important;
}

@media (max-width: 992px) {
  .carbon-flow,
  .case-summary-grid {
    grid-template-columns: 1fr;
  }

  .flow-arrow {
    display: none;
  }
}
</style>
