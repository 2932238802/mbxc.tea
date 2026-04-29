<template>
  <section id="industry" class="industry-section mb-5">
    <div class="section-title-wrapper">
      <div>
        <h2 class="section-title">茶产业</h2>
        <p class="section-subtitle mb-0">从茶园感知、农事管理到产业大脑，形成数字化生产经营闭环</p>
      </div>
      <ul class="nav section-tabs">
        <li class="nav-item"><a class="nav-link active" href="#">数字茶园</a></li>
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

    <div class="tea-map-panel mb-4">
      <div class="tea-map-header">
        <div>
          <h3 class="fw-bold my-2">全国茶产业地图</h3>
          <p class="text-muted mb-0">展示全国重点茶类产区、区域公共品牌与价格行情分布，点击标记可查看产区信息</p>
        </div>
        <div class="map-tabs" role="tablist" aria-label="茶类筛选">
          <button
            v-for="item in teaTypes"
            :key="item"
            type="button"
            :class="['map-tab', { active: activeTeaType === item }]"
            @click="activeTeaType = item"
          >
            {{ item }}
          </button>
        </div>
      </div>

      <div class="tea-map-layout">
        <div class="china-map-card">
          <div class="map-stage">
            <div class="map-bg-map" aria-hidden="true"></div>

            <button
              v-for="point in filteredMapPoints"
              :key="point.name"
              type="button"
              class="map-pin"
              :class="[`pin-${point.kind}`, { active: selectedPoint.name === point.name }]"
              :style="{ left: `${point.x}%`, top: `${point.y}%` }"
              @click="selectedPoint = point"
            >
              <span>{{ point.count }}</span>
            </button>

            <div class="province-label label-xj">新疆</div>
            <div class="province-label label-qh">青海</div>
            <div class="province-label label-hlj">黑龙江</div>
            <div class="province-label label-zj">浙江</div>
            <div class="province-label label-fj">福建</div>
            <div class="province-label label-yn">云南</div>

            <div class="map-tooltip" :style="{ left: `${selectedPoint.x + 3}%`, top: `${selectedPoint.y - 11}%` }">
              <img :src="assetUrl(selectedPoint.image)" :alt="selectedPoint.name">
              <div>
                <strong>{{ selectedPoint.name }}</strong>
                <span><i class="fas fa-location-dot"></i> {{ selectedPoint.location }}</span>
                <small>{{ selectedPoint.desc }}</small>
              </div>
            </div>
          </div>

          <div class="map-legend">
            <span><i class="legend-dot brain"></i> 茶产业大脑</span>
            <span><i class="legend-dot brand"></i> 区域公共品牌</span>
            <span><i class="legend-dot price"></i> 价格行情</span>
          </div>
        </div>

        <aside class="map-detail-card">
          <div class="detail-product">
            <img :src="assetUrl(selectedPoint.image)" :alt="selectedPoint.name">
            <div>
              <h4>{{ selectedPoint.name }}</h4>
              <p><i class="fas fa-location-dot"></i> {{ selectedPoint.location }}</p>
              <p><i class="far fa-clock"></i> {{ selectedPoint.date }}</p>
            </div>
          </div>

          <div class="price-grid">
            <div>
              <span><i class="fas fa-camera"></i> 近期价格</span>
              <strong>¥{{ selectedPoint.price }}</strong>
            </div>
            <div>
              <span><i class="fas fa-calendar-week"></i> 周涨跌幅</span>
              <strong>{{ selectedPoint.weekChange }}%</strong>
            </div>
            <div>
              <span><i class="fas fa-calendar-days"></i> 月涨跌幅</span>
              <strong>{{ selectedPoint.monthChange }}%</strong>
            </div>
          </div>

          <div class="trend-title">该品种最近价格走势</div>
          <div class="mini-chart" aria-hidden="true">
            <span v-for="n in 5" :key="n" class="grid-line"></span>
            <svg viewBox="0 0 320 130" preserveAspectRatio="none">
              <polyline :points="selectedPoint.trend" fill="none" stroke="#0f8f52" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
              <circle :cx="selectedPoint.trendDot.x" :cy="selectedPoint.trendDot.y" r="5" fill="#12b76a" stroke="#fff" stroke-width="3" />
            </svg>
            <div class="chart-axis">2025-12-01</div>
          </div>
        </aside>
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
import { computed, ref } from 'vue'
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

type TeaType = '全部' | '绿茶' | '白茶' | '黄茶' | '乌龙茶' | '红茶' | '黑茶' | '花茶'
type MapPoint = {
  name: string
  type: Exclude<TeaType, '全部'>
  kind: 'brain' | 'brand' | 'price'
  location: string
  desc: string
  image: string
  date: string
  price: string
  weekChange: string
  monthChange: string
  count: number
  x: number
  y: number
  trend: string
  trendDot: { x: number; y: number }
}

const teaTypes: TeaType[] = ['全部', '绿茶', '白茶', '黄茶', '乌龙茶', '红茶', '黑茶', '花茶']
const activeTeaType = ref<TeaType>('全部')

const mapPoints: MapPoint[] = [
  { name: '安吉白茶', type: '白茶', kind: 'price', location: '浙江省湖州市安吉县', desc: '绿茶工艺代表品类，区域品牌价值突出', image: '茶叶.jpg', date: '2026-03-31', price: '508.35', weekChange: '0', monthChange: '0', count: 57, x: 75, y: 65, trend: '10,102 82,92 146,82 214,54 292,74', trendDot: { x: 214, y: 54 } },
  { name: '西湖龙井', type: '绿茶', kind: 'brain', location: '浙江省杭州市西湖区', desc: '中国名优绿茶核心产区，品牌影响力领先', image: '精选级.jpg', date: '2026-03-28', price: '820.00', weekChange: '1.2', monthChange: '3.6', count: 8, x: 73, y: 63, trend: '12,98 74,80 132,84 214,58 296,42', trendDot: { x: 296, y: 42 } },
  { name: '安顶云雾茶', type: '绿茶', kind: 'brain', location: '浙江省杭州市富阳区里山镇', desc: '高山云雾小气候孕育，数字茶园示范基地', image: '总览.jpg', date: '2026-04-01', price: '398.00', weekChange: '0.8', monthChange: '2.4', count: 16, x: 72, y: 66, trend: '12,96 86,86 152,68 218,70 296,46', trendDot: { x: 296, y: 46 } },
  { name: '武夷岩茶', type: '乌龙茶', kind: 'brand', location: '福建省南平市武夷山市', desc: '乌龙茶重要区域公共品牌，山场资源丰富', image: '手工·匠心.jpg', date: '2026-03-25', price: '686.50', weekChange: '0.5', monthChange: '1.7', count: 20, x: 69, y: 72, trend: '10,92 76,84 150,64 228,66 296,50', trendDot: { x: 296, y: 50 } },
  { name: '祁门红茶', type: '红茶', kind: 'brand', location: '安徽省黄山市祁门县', desc: '世界三大高香红茶之一，出口历史悠久', image: '特选级.jpg', date: '2026-03-20', price: '326.80', weekChange: '0.2', monthChange: '1.1', count: 11, x: 66, y: 63, trend: '10,104 82,82 146,86 226,62 294,66', trendDot: { x: 226, y: 62 } },
  { name: '普洱茶', type: '黑茶', kind: 'price', location: '云南省西双版纳州勐海县', desc: '黑茶与后发酵茶代表品类，收藏与消费并重', image: '优选级.jpg', date: '2026-03-18', price: '268.00', weekChange: '-0.4', monthChange: '0.9', count: 26, x: 46, y: 79, trend: '12,82 78,88 148,76 226,94 296,70', trendDot: { x: 296, y: 70 } },
  { name: '茉莉花茶', type: '花茶', kind: 'price', location: '广西壮族自治区横州市', desc: '中国茉莉花茶核心产区，花茶加工基础完善', image: '以茶代酒.jpg', date: '2026-03-12', price: '138.90', weekChange: '0.6', monthChange: '2.1', count: 21, x: 59, y: 83, trend: '12,96 80,90 152,74 218,78 296,58', trendDot: { x: 296, y: 58 } },
  { name: '君山银针', type: '黄茶', kind: 'brand', location: '湖南省岳阳市君山区', desc: '黄茶代表品类，产地文化辨识度高', image: '茶叶.jpg', date: '2026-03-09', price: '466.20', weekChange: '0', monthChange: '1.3', count: 14, x: 61, y: 70, trend: '12,100 80,88 150,82 226,68 296,72', trendDot: { x: 226, y: 68 } },
]

const selectedPoint = ref<MapPoint>(mapPoints[0])

const filteredMapPoints = computed(() => {
  if (activeTeaType.value === '全部') return mapPoints
  const list = mapPoints.filter(point => point.type === activeTeaType.value)
  if (list.length && !list.some(point => point.name === selectedPoint.value.name)) {
    selectedPoint.value = list[0]
  }
  return list
})
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

.tea-map-panel {
  overflow: hidden;
  border: 1px solid var(--tea-border);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: var(--tea-shadow);
  backdrop-filter: blur(16px);
}

.tea-map-header {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-end;
  padding: 26px 28px 16px;
  border-bottom: 1px solid var(--tea-border);
}

.tea-map-header h3 { color: var(--tea-text); }

.map-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
}

.map-tab {
  min-width: 66px;
  padding: 8px 14px;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--tea-text);
  background: transparent;
  font-weight: 800;
  transition: all .2s ease;
}

.map-tab:hover,
.map-tab.active {
  color: var(--tea-primary);
  border-bottom-color: var(--tea-primary);
  background: var(--tea-primary-soft);
  border-radius: 999px 999px 8px 8px;
}

.tea-map-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  min-height: 560px;
}

.china-map-card {
  position: relative;
  padding: 28px;
  background: linear-gradient(180deg, rgba(255,255,255,.92), rgba(248,252,250,.96));
}

.map-stage {
  position: relative;
  height: 480px;
  overflow: hidden;
  border-radius: 22px;
  background: radial-gradient(circle at center, rgba(18,183,106,.08), transparent 55%);
}

.map-bg-map {
  position: absolute;
  inset: 26px 24px 30px;
  background: rgba(43, 122, 59, .26);
  border: 2px solid rgba(43, 122, 59, .72);
  clip-path: polygon(8% 42%, 18% 30%, 27% 36%, 34% 24%, 45% 28%, 50% 12%, 58% 10%, 62% 25%, 76% 28%, 83% 37%, 78% 48%, 88% 58%, 80% 70%, 70% 67%, 66% 83%, 55% 78%, 48% 90%, 36% 80%, 27% 82%, 20% 68%, 10% 62%);
}

.province-label {
  position: absolute;
  color: rgba(255,255,255,.72);
  font-size: .82rem;
  font-weight: 900;
  pointer-events: none;
  text-shadow: 0 1px 3px rgba(0,0,0,.18);
}
.label-xj { left: 20%; top: 38%; }
.label-qh { left: 36%; top: 50%; }
.label-hlj { right: 19%; top: 22%; }
.label-zj { right: 21%; top: 62%; }
.label-fj { right: 24%; top: 71%; }
.label-yn { left: 43%; bottom: 18%; }

.map-pin {
  position: absolute;
  z-index: 3;
  width: 28px;
  height: 34px;
  border: none;
  color: #fff;
  background: transparent;
  transform: translate(-50%, -100%);
  cursor: pointer;
}

.map-pin::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  background: var(--pin-color);
  box-shadow: 0 8px 16px rgba(0,0,0,.16);
}

.map-pin span {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  height: 25px;
  font-size: .78rem;
  font-weight: 950;
}

.pin-brain { --pin-color: #16a34a; }
.pin-brand { --pin-color: #f59e0b; }
.pin-price { --pin-color: #84cc16; }
.map-pin.active { transform: translate(-50%, -100%) scale(1.14); }

.map-tooltip {
  position: absolute;
  z-index: 5;
  width: 250px;
  display: flex;
  gap: 10px;
  padding: 10px;
  border-radius: 14px;
  background: rgba(255,255,255,.88);
  border: 1px solid rgba(0,104,59,.12);
  box-shadow: 0 12px 30px rgba(0,0,0,.14);
  backdrop-filter: blur(10px);
}

.map-tooltip img {
  width: 52px;
  height: 52px;
  object-fit: cover;
  border-radius: 10px;
}
.map-tooltip strong,
.map-tooltip span,
.map-tooltip small { display: block; }
.map-tooltip strong { color: var(--tea-text); font-weight: 900; }
.map-tooltip span { color: var(--tea-text-muted); font-size: .82rem; }
.map-tooltip small { color: var(--tea-primary); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 160px; }

.map-legend {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  padding: 12px 6px 0;
  color: var(--tea-text);
  font-weight: 800;
}
.legend-dot { width: 13px; height: 13px; display: inline-block; border-radius: 50%; margin-right: 7px; }
.legend-dot.brain { background: #16a34a; }
.legend-dot.brand { background: #f59e0b; }
.legend-dot.price { background: #84cc16; }

.map-detail-card {
  padding: 48px 26px;
  background: #f3f6fb;
  border-left: 1px solid var(--tea-border);
}

.detail-product {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 18px;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 10px 26px rgba(0,0,0,.05);
}
.detail-product img { width: 76px; height: 76px; border-radius: 16px; object-fit: cover; }
.detail-product h4 { margin: 0 0 8px; color: #111827; font-weight: 950; }
.detail-product p { margin: 2px 0; color: #8a94a6; font-size: .9rem; }

.price-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 20px 0; }
.price-grid div { min-height: 84px; padding: 14px 10px; border-radius: 12px; background: #eef3fb; text-align: center; }
.price-grid span { display: block; color: #64748b; font-size: .78rem; font-weight: 800; margin-bottom: 8px; }
.price-grid span i { color: #12b76a; margin-right: 3px; }
.price-grid strong { color: #111827; font-size: 1.05rem; }

.trend-title { margin: 12px 0 14px; padding-left: 9px; border-left: 4px solid var(--tea-primary); color: #1f2937; font-weight: 900; }
.mini-chart { position: relative; height: 190px; padding: 18px 8px 28px; border-radius: 18px; background: #fff; overflow: hidden; }
.grid-line { position: absolute; left: 42px; right: 22px; height: 1px; background: #e5e7eb; }
.grid-line:nth-child(1) { top: 28px; }
.grid-line:nth-child(2) { top: 58px; }
.grid-line:nth-child(3) { top: 88px; }
.grid-line:nth-child(4) { top: 118px; }
.grid-line:nth-child(5) { top: 148px; }
.mini-chart svg { position: relative; z-index: 1; width: 100%; height: 130px; }
.chart-axis { text-align: center; color: #6b7280; font-size: .82rem; }

.scene-card h5 { color: var(--tea-text); font-weight: 800; }
.scene-card p { color: var(--tea-text-muted); line-height: 1.8; margin: 0; }
@media (max-width: 992px) {
  .tea-map-header,
  .tea-map-layout { grid-template-columns: 1fr; }
  .tea-map-header { flex-direction: column; align-items: flex-start; }
  .map-tabs { justify-content: flex-start; }
  .map-detail-card { border-left: none; border-top: 1px solid var(--tea-border); padding: 24px; }
  .map-stage { height: 400px; }
}

@media (max-width: 768px) {
  .section-title-wrapper { flex-direction: column; align-items: flex-start; }
  .industry-img { min-height: 280px; }
}
</style>
