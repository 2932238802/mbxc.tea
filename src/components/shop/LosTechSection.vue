<template>
  <section id="tech" class="tech-section mb-5">
    <div class="section-title-wrapper">
      <div>
        <h2 class="section-title">茶科技</h2>
        <p class="section-subtitle mb-0">用硬件、算法和虚拟体验，把茶叶从产地到消费者的链路变得可信、可视、可互动</p>
      </div>
      <a href="#tech-roadmap" class="text-muted text-decoration-none">技术路线 <i class="fas fa-angle-right"></i></a>
    </div>

    <div class="tech-banner mb-4">
      <div>
        <span class="tech-badge">Traceability Tech</span>
        <h3>从一杆秤到一座数字茶园</h3>
        <p>采收称重、加工记录、茶标生成、扫码查询、沉浸式展示，构建安顶云雾茶的数字信任系统</p>
      </div>
      <button class="btn btn-success rounded-pill px-4" @click="$emit('openMetaverse')">
        <i class="fas fa-vr-cardboard me-2"></i>进入茶园元宇宙
      </button>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-md-3 col-sm-6" v-for="item in techItems" :key="item.title">
        <div class="service-card text-center" :role="item.metaverse ? 'button' : undefined" @click="item.metaverse && $emit('openMetaverse')">
          <div class="service-icon"><span class="visual-mark">{{ visualIcon(item.visual) }}</span></div>
          <h5 class="service-title">{{ item.title }}</h5>
          <p class="service-desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>

    <div class="roadmap" id="tech-roadmap">
      <div class="roadmap-item" v-for="step in roadmap" :key="step.title">
        <div class="roadmap-dot"><span class="visual-mark">{{ visualIcon(step.visual) }}</span></div>
        <div>
          <h6>{{ step.title }}</h6>
          <p>{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { visualIcon, type VisualKey } from '@/utils/visual'

defineEmits<{ openMetaverse: [] }>()

const techItems: Array<{ title: string; visual: VisualKey; desc: string; metaverse?: boolean }> = [
  { title: '智能溯源秤', visual: 'trace', desc: '茶青收购、加工称重数字化记录产地、品种、等级及茶农信息，实现源头可追溯' },
  { title: '茶标自助机', visual: 'qr', desc: '一物一码，扫码即查，为每一份安顶云雾茶生成唯一数字身份证，保障品牌信誉' },
  { title: '智能硬件集成', visual: 'chip', desc: '整合气象站、视频监控、水肥一体化设备，构建完整的茶园物联网生态系统' },
  { title: '茶园元宇宙', visual: 'vr', desc: '利用 VR/AR 技术，让消费者身临其境体验安顶山云雾缭绕的采茶场景', metaverse: true },
]

const roadmap: Array<{ title: string; visual: VisualKey; desc: string }> = [
  { title: '采收上链', visual: 'leaf', desc: '采摘、称重、茶农信息和批次数据进入溯源链路' },
  { title: '加工记录', visual: 'fire', desc: '摊青、杀青、揉捻、干燥等工序形成标准化记录' },
  { title: '茶标生成', visual: 'qr', desc: '为茶品绑定二维码，消费者扫码查看产地和工艺' },
  { title: '沉浸展示', visual: 'vr', desc: '通过虚拟茶园增强品牌体验和茶文旅转化' },
]
</script>

<style scoped>
.tech-section { position: relative; z-index: 1; }
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
.tech-banner {
  display: flex; justify-content: space-between; align-items: center; gap: 24px;
  border: 1px solid var(--tea-border); border-radius: 24px; padding: 28px;
  background: linear-gradient(135deg, var(--tea-surface-soft), var(--tea-primary-soft));
  box-shadow: var(--tea-shadow);
}
.tech-badge {
  display: inline-flex; padding: 6px 14px; border-radius: 999px;
  color: var(--tea-primary); background: var(--tea-primary-soft); font-weight: 800; font-size: .86rem;
}
.tech-banner h3 { margin: 14px 0 8px; color: var(--tea-text); font-weight: 900; }
.tech-banner p { margin: 0; color: var(--tea-text-muted); line-height: 1.8; max-width: 720px; }
.service-card {
  background: var(--tea-surface-soft); border-radius: 18px; padding: 24px;
  box-shadow: var(--tea-shadow); transition: all 0.3s;
  height: 100%; border: 1px solid var(--tea-border);
}
.service-card:hover { transform: translateY(-5px); border-color: var(--tea-primary); }
.service-icon {
  width: 58px; height: 58px; display: inline-flex; align-items: center; justify-content: center;
  border-radius: 18px; color: var(--tea-primary); background: var(--tea-primary-soft);
  font-size: 1.5rem; margin-bottom: 16px;
}
.visual-mark { font-size: 1.35rem; line-height: 1; font-weight: 900; }
.service-title { font-size: 1.1rem; font-weight: 800; margin-bottom: 10px; color: var(--tea-text); }
.service-desc { font-size: 0.9rem; color: var(--tea-text-muted); line-height: 1.7; }
.roadmap {
  display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px;
}
.roadmap-item {
  display: flex; gap: 12px; padding: 18px; border-radius: 18px;
  border: 1px solid var(--tea-border); background: var(--tea-surface-soft);
}
.roadmap-dot {
  width: 38px; height: 38px; flex: 0 0 38px; display: flex; align-items: center; justify-content: center;
  border-radius: 14px; color: var(--tea-primary); background: var(--tea-primary-soft);
}
.roadmap-item h6 { color: var(--tea-text); font-weight: 800; }
.roadmap-item p { color: var(--tea-text-muted); margin: 0; line-height: 1.7; font-size: .88rem; }
@media (max-width: 992px) {
  .tech-banner { flex-direction: column; align-items: flex-start; }
  .roadmap { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 576px) {
  .section-title-wrapper { flex-direction: column; align-items: flex-start; }
  .roadmap { grid-template-columns: 1fr; }
}
</style>
