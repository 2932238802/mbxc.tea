<template>
  <section id="industry" class="industry-section mb-5">
    <div class="section-title-wrapper">
      <div>
        <h2 class="section-title">茶产业</h2>
        <p class="section-subtitle mb-0">从茶园感知、农事管理到产业大脑，形成数字化生产经营闭环</p>
      </div>
      <ul class="nav section-tabs">
        <li class="nav-item"><a class="nav-link active" href="#">数字茶园</a></li>
        <li class="nav-item"><a class="nav-link" href="#future">未来茶场</a></li>
        <li class="nav-item"><router-link class="nav-link" to="/dashboard">茶产业大脑</router-link></li>
      </ul>
    </div>

    <div class="row g-4 align-items-stretch mb-4">
      <div class="col-lg-6">
        <div class="image-card h-100">
          <img :src="assetUrl('数字2.jpg')" class="industry-img" alt="数字茶园">
          <div class="image-caption">
            <strong>安顶山数字茶园示范基地</strong>
            <span>实时采集茶园气象、土壤、虫情与长势数据</span>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="industry-card h-100">
          <span class="industry-badge">Digital Tea Garden</span>
          <h3 class="fw-bold my-3 text-success">安顶山数字茶园示范基地</h3>
          <p class="text-muted mb-4">
            通过部署智能气象站、土壤墒情监测仪、虫情测报灯等物联网设备，实时采集茶园环境数据，结合遥感卫星影像，实现茶园长势监测、灾害预警和精准施肥灌溉
          </p>
          <div class="row g-3 mb-4">
            <div class="col-6" v-for="item in highlights" :key="item.title">
              <div class="highlight-card h-100">
                <span class="visual-mark">{{ visualIcon(item.visual) }}</span>
                <h6 class="fw-bold">{{ item.title }}</h6>
                <small class="text-muted">{{ item.desc }}</small>
              </div>
            </div>
          </div>
          <div class="progress-panel">
            <div v-for="item in progress" :key="item.label" class="progress-row">
              <div class="d-flex justify-content-between mb-1">
                <span>{{ item.label }}</span>
                <strong>{{ item.value }}%</strong>
              </div>
              <div class="progress"><div class="progress-bar" :style="{ width: `${item.value}%` }"></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4" id="future">
      <div class="col-md-4" v-for="item in scenes" :key="item.title">
        <div class="scene-card h-100">
          <div class="scene-icon"><span class="visual-mark">{{ visualIcon(item.visual) }}</span></div>
          <h5>{{ item.title }}</h5>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { assetUrl } from '@/utils/asset'
import { visualIcon, type VisualKey } from '@/utils/visual'

const highlights: Array<{ title: string; visual: VisualKey; desc: string }> = [
  { title: '全域感知', visual: 'sensor', desc: '空天地一体化监测体系' },
  { title: '智能决策', visual: 'brain', desc: 'AI 辅助农事管理建议' },
  { title: '灾害预警', visual: 'weather', desc: '异常天气与虫情提醒' },
  { title: '精准农事', visual: 'water', desc: '水肥管理与作业排程' },
]

const progress = [
  { label: '茶园感知覆盖', value: 86 },
  { label: '农事数据沉淀', value: 72 },
  { label: '生产协同效率', value: 64 },
]

const scenes: Array<{ title: string; visual: VisualKey; desc: string }> = [
  { title: '未来茶场', visual: 'leaf', desc: '把种植、采摘、加工和仓储流程数字化，减少人工判断成本' },
  { title: '产业协同', visual: 'trace', desc: '连接茶农、合作社、茶企和渠道端，形成产业链协同网络' },
  { title: '数据资产', visual: 'research', desc: '沉淀茶园环境、产量、品质和交易数据，为品牌与金融服务提供依据' },
]
</script>

<style scoped>
.industry-section { position: relative; z-index: 1; }
.section-title-wrapper {
  display: flex; justify-content: space-between; align-items: flex-end; gap: 16px;
  margin-bottom: 30px; border-bottom: 1px solid var(--tea-border); padding-bottom: 14px;
}
.section-title {
  font-size: 1.8rem; font-weight: 800; color: var(--tea-primary);
  position: relative; padding-left: 15px; margin-bottom: 4px;
}
.section-title::before {
  content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%);
  width: 5px; height: 25px; background-color: var(--tea-primary); border-radius: 2px;
}
.section-subtitle { color: var(--tea-text-muted); padding-left: 15px; }
.section-tabs .nav-link {
  color: var(--tea-text-muted) !important; border: none; background: transparent; font-weight: 600; padding: 8px 12px; border-radius: 999px;
}
.section-tabs .nav-link.active,
.section-tabs .nav-link:hover { color: var(--tea-primary) !important; background: var(--tea-primary-soft); }
.image-card,
.industry-card,
.scene-card {
  overflow: hidden; border: 1px solid var(--tea-border); border-radius: 22px;
  background: var(--tea-surface-soft); box-shadow: var(--tea-shadow);
}
.image-card { position: relative; min-height: 100%; }
.industry-img { width: 100%; height: 100%; min-height: 420px; object-fit: cover; display: block; }
.image-caption {
  position: absolute; left: 18px; right: 18px; bottom: 18px; padding: 16px;
  border-radius: 18px; background: rgba(0,0,0,.46); color: #fff; backdrop-filter: blur(10px);
}
.image-caption strong,
.image-caption span { display: block; }
.image-caption span { opacity: .82; margin-top: 4px; }
.industry-card { padding: 28px; }
.industry-badge {
  display: inline-flex; padding: 6px 14px; border-radius: 999px;
  color: var(--tea-primary); background: var(--tea-primary-soft); font-weight: 800; font-size: .86rem;
}
.highlight-card,
.scene-card { padding: 18px; }
.highlight-card {
  border: 1px solid var(--tea-border); border-radius: 16px; background: var(--tea-surface);
}
.highlight-card .visual-mark,
.scene-icon { color: var(--tea-primary); margin-bottom: 10px; }
.progress-panel { display: grid; gap: 14px; }
.progress-row span { color: var(--tea-text-muted); font-weight: 700; }
.progress-row strong { color: var(--tea-primary); }
.progress { height: 8px; background: var(--tea-surface); border: 1px solid var(--tea-border); }
.progress-bar { background: var(--tea-primary); border-radius: 999px; }
.scene-card { transition: all .25s ease; }
.scene-card:hover { transform: translateY(-4px); border-color: var(--tea-primary); }
.scene-icon {
  width: 46px; height: 46px; display: flex; align-items: center; justify-content: center;
  border-radius: 15px; background: var(--tea-primary-soft); font-size: 1.2rem;
}
.visual-mark { font-size: 1.18rem; line-height: 1; font-weight: 900; }
.scene-card h5 { color: var(--tea-text); font-weight: 800; }
.scene-card p { color: var(--tea-text-muted); line-height: 1.8; margin: 0; }
@media (max-width: 768px) {
  .section-title-wrapper { flex-direction: column; align-items: flex-start; }
  .industry-img { min-height: 280px; }
}
</style>
