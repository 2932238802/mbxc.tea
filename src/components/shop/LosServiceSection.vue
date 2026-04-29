<template>
  <section id="service" class="service-section mb-5">
    <div class="service-heading text-center mb-4">
      <span class="service-kicker">Tea Service</span>
      <h2>茶服务</h2>
      <p>围绕茶品牌、茶品控、茶交易、茶金融等场景，为茶企提供完整数字化服务能力</p>
    </div>

    <div class="service-tabs-wrap mb-4">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="service-tab"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="service-intro mb-4">
      <div>
        <span class="service-badge">{{ currentTab.badge }}</span>
        <h3>{{ currentTab.title }}</h3>
      </div>
      <div class="intro-count">
        <strong>{{ currentServices.length }}</strong>
        <span>项能力</span>
      </div>
    </div>

    <div class="service-image-grid">
      <article
        v-for="item in currentServices"
        :key="item.title"
        class="service-image-card"
        :class="[{ featured: item.featured }, item.tone]"
      >
        <img :src="assetUrl(item.image)" :alt="item.title">
        <div class="card-mask"></div>
        <div class="card-content">
          <span class="card-tag">{{ item.tag }}</span>
          <h4>{{ item.title }}</h4>
          <ul>
            <li v-for="point in item.points" :key="point">{{ point }}</li>
          </ul>
          <a :href="searchUrl(item.title)" target="_blank" rel="noopener noreferrer" class="more-btn">更多 <i class="fas fa-angle-right ms-1"></i></a>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { assetUrl } from '@/utils/asset'

type TabKey = 'brand' | 'quality' | 'standard' | 'trade' | 'mall' | 'supply' | 'finance' | 'recruit'

type ServiceCard = {
  title: string
  desc: string
  tag: string
  image: string
  tone: 'green' | 'lime' | 'dark-green' | 'white' | 'teal' | 'blue' | 'orange' | 'purple'
  featured?: boolean
  points: string[]
}

const activeTab = ref<TabKey>('brand')

const tabs: Array<{
  key: TabKey
  label: string
  badge: string
  title: string
  description: string
}> = [
  {
    key: 'brand',
    label: '茶品牌',
    badge: '品牌增长',
    title: '茶品牌 · 从调研、定位到内容传播',
    description: '覆盖茶市场洞察、品牌定位、命名口号、形象设计、营销活动和宣传拍摄，帮助茶企建立统一品牌表达。',
  },
  {
    key: 'quality',
    label: '茶品控',
    badge: '品质管控',
    title: '茶品控 · 从茶园到成品的质量追踪',
    description: '结合生产批次、加工工艺、检测数据和品鉴记录，形成可查询、可追溯、可复盘的质量管理体系。',
  },
  {
    key: 'standard',
    label: '茶标准',
    badge: '标准体系',
    title: '茶标准 · 建立等级、工艺与包装规范',
    description: '为区域品牌和茶企沉淀产品标准、采摘标准、加工标准和包装标准，提升规模化运营能力。',
  },
  {
    key: 'trade',
    label: '茶交易',
    badge: '交易撮合',
    title: '茶交易 · 打通线上预售与线下履约',
    description: '面向茶企、渠道商和企业客户提供采购撮合、预售订单、团购管理与履约跟踪服务。',
  },
  {
    key: 'mall',
    label: '茶商城',
    badge: '电商运营',
    title: '茶商城 · 茶品与文创一体化销售',
    description: '支持云雾茶、茶礼盒、茶小泽文创周边等商品上架、购物车、订单和会员复购运营。',
  },
  {
    key: 'supply',
    label: '茶农资',
    badge: '农资协同',
    title: '茶农资 · 面向茶园生产的供应链服务',
    description: '围绕肥料、农具、包装耗材和茶园设备，提供采购计划、用量建议和供应商协同。',
  },
  {
    key: 'finance',
    label: '茶金融',
    badge: '供应链金融',
    title: '茶金融 · 基于真实经营数据的普惠金融',
    description: '沉淀茶园、库存、订单和销售数据，为茶企、合作社和茶农提供授信评估与融资服务入口。',
  },
  {
    key: 'recruit',
    label: '招工管理',
    badge: '用工协同',
    title: '招工管理 · 采茶季临时用工与班组管理',
    description: '支持茶园采摘、加工、包装等环节的用工发布、人员报名、排班和结算记录。',
  },
]

const baseCards: Record<TabKey, ServiceCard[]> = {
  brand: [
    {
      title: '茶市场和消费者调研',
      tag: '洞察',
      image: '游客服务中心.jpg',
      tone: 'green',
      desc: '采集茶企相关信息，从宏观层面给予茶产业、行业、竞品、受众宏观洞察。',
      points: ['消费人群洞察', '竞品卖点拆解', '价格带研究'],
    },
    {
      title: '茶产品品牌定位',
      tag: '定位',
      image: '茶叶.jpg',
      tone: 'lime',
      featured: true,
      desc: '在基于品牌发展愿景、使命的基础上，茶企在核心价值、产品结构和客群上形成清晰定位。',
      points: ['核心卖点提炼', '品牌主张梳理', '产品矩阵规划'],
    },
    {
      title: '品牌形象设计',
      tag: '视觉',
      image: '总览.jpg',
      tone: 'white',
      desc: '基于品牌定位、品牌命名、品牌口号，对茶企品牌进行品牌 logo、包装、宣传物料等内容设计。',
      points: ['Logo 设计', '包装设计', '视觉识别系统'],
    },
  ],
  quality: [
    { title: '茶园批次管理', tag: '批次', image: '数字2.jpg', tone: 'green', desc: '记录茶园地块、采摘时间、鲜叶来源和加工批次，形成完整质量链路。', points: ['地块档案', '采摘记录', '批次追踪'] },
    { title: '检测与品鉴记录', tag: '检测', image: '精选级.jpg', tone: 'white', featured: true, desc: '沉淀水分、香气、汤色、滋味和叶底等检测品鉴数据，辅助品质评级。', points: ['感官评审', '指标记录', '等级判定'] },
    { title: '质量异常预警', tag: '预警', image: '碳汇.jpg', tone: 'teal', desc: '当加工过程、仓储环境或检测结果异常时，及时提醒并形成处置记录。', points: ['过程监控', '异常提醒', '整改闭环'] },
  ],
  standard: [
    { title: '采摘标准', tag: '采摘', image: '松香茶径.jpg', tone: 'green', desc: '根据不同等级茶品定义采摘时间、芽叶标准和采摘方式。', points: ['芽叶等级', '采摘窗口', '作业规范'] },
    { title: '加工标准', tag: '工艺', image: '手工·匠心.jpg', tone: 'white', featured: true, desc: '沉淀摊青、杀青、揉捻、干燥等工艺标准，保障产品稳定性。', points: ['工艺节点', '温湿控制', '师傅经验'] },
    { title: '包装标准', tag: '包装', image: '特选级.jpg', tone: 'blue', desc: '统一茶礼盒、标签、溯源码和外箱包装规范，提升品牌识别度。', points: ['标签规范', '礼盒规范', '溯源码规则'] },
  ],
  trade: [
    { title: '企业采购撮合', tag: 'B端', image: '茶叶.jpg', tone: 'green', desc: '对接企业团购、经销商和渠道客户，提升大单转化效率。', points: ['采购需求', '报价管理', '合同跟踪'] },
    { title: '预售订单管理', tag: '预售', image: '精选级.jpg', tone: 'white', featured: true, desc: '支持春茶上市前预售、定金锁单和批次履约管理。', points: ['定金预售', '批次履约', '发货提醒'] },
    { title: '交易履约跟踪', tag: '履约', image: '游客服务中心.jpg', tone: 'orange', desc: '跟踪订单、仓储、物流和回款状态，保障交易闭环。', points: ['订单进度', '物流节点', '回款记录'] },
  ],
  mall: [
    { title: '茶品在线销售', tag: '商城', image: '特选级.jpg', tone: 'green', desc: '支持不同等级云雾茶商品展示、规格选择和在线下单。', points: ['商品上架', '规格管理', '购物车'] },
    { title: '文创周边销售', tag: '文创', image: '茶小泽2.png', tone: 'white', featured: true, desc: '销售茶小泽 IP 周边、冰箱贴、钥匙扣和茶宠摆件。', points: ['IP 商品', '周边组合', '礼品推荐'] },
    { title: '会员复购运营', tag: '会员', image: '茶宠.jpg', tone: 'purple', desc: '结合购买记录、偏好和节庆节点，提升复购和客单价。', points: ['会员画像', '复购提醒', '优惠策略'] },
  ],
  supply: [
    { title: '农资采购计划', tag: '计划', image: '数字2.jpg', tone: 'green', desc: '根据茶园面积、农事计划和季节变化生成农资采购建议。', points: ['肥料计划', '耗材计划', '设备采购'] },
    { title: '供应商协同', tag: '协同', image: '游客服务中心.jpg', tone: 'white', featured: true, desc: '连接农资供应商，管理报价、交付和服务评价。', points: ['供应商档案', '报价比选', '履约评价'] },
    { title: '茶园物资台账', tag: '台账', image: '导览.jpg', tone: 'teal', desc: '记录农资入库、领用、消耗与库存，减少人工统计成本。', points: ['入库记录', '领用登记', '库存预警'] },
  ],
  finance: [
    { title: '茶园贷', tag: '授信', image: '松香茶径.jpg', tone: 'green', desc: '基于茶园面积、历史产量和农事数据，为茶农与合作社提供资金支持。', points: ['资产评估', '农事佐证', '生产周转'] },
    { title: '订单贷', tag: '订单', image: '精选级.jpg', tone: 'white', featured: true, desc: '基于真实订单、预售记录和采购合同，为茶企提供短期资金支持。', points: ['订单核验', '回款评估', '履约跟踪'] },
    { title: '库存仓单融资', tag: '库存', image: '优选级.jpg', tone: 'blue', desc: '结合茶叶库存、等级、仓储记录和销售行情，对优质茶品进行价值评估。', points: ['库存盘点', '等级评估', '仓储记录'] },
  ],
  recruit: [
    { title: '采茶工招募', tag: '招募', image: '古树群公园.jpg', tone: 'green', desc: '在春茶采摘季快速发布用工需求，连接周边劳动力资源。', points: ['需求发布', '人员报名', '联系方式'] },
    { title: '班组排班', tag: '排班', image: '松香茶径.jpg', tone: 'white', featured: true, desc: '按茶园地块、采摘任务和人员技能进行排班安排。', points: ['人员分组', '地块任务', '考勤记录'] },
    { title: '工时结算', tag: '结算', image: '城市书屋.jpg', tone: 'orange', desc: '记录采摘重量、工时和补贴，辅助工资结算与复盘。', points: ['采摘重量', '工时统计', '结算明细'] },
  ],
}

const currentTab = computed(() => tabs.find(tab => tab.key === activeTab.value)!)
const currentServices = computed(() => baseCards[activeTab.value])

function searchUrl(title: string) {
  return `https://www.baidu.com/s?wd=${encodeURIComponent(title)}`
}
</script>

<style scoped>
.service-section {
  position: relative;
  z-index: 1;
}

.service-heading h2 {
  margin: 8px 0 10px;
  color: var(--tea-text);
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 950;
}

.service-heading p {
  max-width: 760px;
  margin: 0 auto;
  color: var(--tea-text-muted);
  line-height: 1.8;
}

.service-kicker,
.service-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 6px 14px;
  color: var(--tea-primary);
  background: var(--tea-primary-soft);
  font-size: .86rem;
  font-weight: 900;
}

.service-tabs-wrap {
  display: grid;
  grid-template-columns: repeat(8, minmax(80px, 1fr));
  gap: 0;
  border-bottom: 1px solid var(--tea-border);
}

.service-tab {
  position: relative;
  padding: 14px 8px;
  border: none;
  background: transparent;
  color: var(--tea-text);
  font-weight: 900;
  transition: color .22s ease;
}

.service-tab::after {
  content: '';
  position: absolute;
  left: 18%;
  right: 18%;
  bottom: -1px;
  height: 3px;
  border-radius: 999px;
  background: transparent;
}

.service-tab.active,
.service-tab:hover {
  color: var(--tea-primary);
}

.service-tab.active::after {
  background: var(--tea-primary);
}

.service-intro {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 24px 26px;
  border: 1px solid var(--tea-border);
  border-radius: 24px;
  background: var(--tea-surface-soft);
  box-shadow: var(--tea-shadow);
  backdrop-filter: blur(14px);
}

.service-intro h3 {
  margin: 12px 0 8px;
  color: var(--tea-primary);
  font-weight: 900;
}

.service-intro p {
  margin: 0;
  color: var(--tea-text-muted);
  line-height: 1.8;
}

.intro-count {
  min-width: 96px;
  height: 96px;
  border-radius: 26px;
  display: grid;
  place-items: center;
  color: #fff;
  background: linear-gradient(135deg, #00683B, #12b76a);
  box-shadow: 0 14px 30px rgba(0, 104, 59, .18);
}

.intro-count strong,
.intro-count span {
  display: block;
  line-height: 1;
}

.intro-count strong { font-size: 2rem; }
.intro-count span { margin-top: -16px; font-size: .82rem; font-weight: 800; }

.service-image-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 16px;
  align-items: stretch;
}

.service-image-card {
  position: relative;
  min-height: 430px;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid rgba(0, 104, 59, .18);
  box-shadow: 0 14px 36px rgba(0, 0, 0, .08);
  transition: transform .28s ease, box-shadow .28s ease, filter .28s ease;
  transform-origin: center;
  isolation: isolate;
}

.service-image-card.featured {
  grid-column: span 2;
}

.service-image-card:hover {
  z-index: 5;
  transform: scale(1.055) translateY(-6px);
  box-shadow: 0 24px 60px rgba(0, 104, 59, .22);
}

.service-image-card img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .45s ease;
}

.service-image-card:hover img {
  transform: scale(1.12);
}

.card-mask {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(180deg, var(--card-tint), rgba(0,0,0,.08));
  mix-blend-mode: multiply;
}

.service-image-card.white .card-mask {
  background: linear-gradient(180deg, rgba(255,255,255,.88), rgba(255,255,255,.46));
  mix-blend-mode: normal;
}

.card-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 22px 18px;
  color: #fff;
}

.service-image-card.white .card-content {
  color: #0f1f17;
}

.card-tag {
  width: fit-content;
  padding: 4px 9px;
  margin-bottom: 14px;
  border-radius: 999px;
  color: #fff;
  background: rgba(0, 104, 59, .72);
  font-size: .78rem;
  font-weight: 900;
}

.service-image-card.white .card-tag {
  background: var(--tea-primary);
}

.card-content h4 {
  margin: 0 0 12px;
  font-size: 1.16rem;
  font-weight: 950;
}

.card-content p {
  color: currentColor;
  opacity: .92;
  line-height: 1.75;
  font-size: .92rem;
}

.card-content ul {
  margin: auto 0 16px;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 6px;
}

.card-content li {
  font-size: .82rem;
  opacity: .88;
}

.card-content li::before {
  content: '•';
  margin-right: 6px;
  color: #a7f3c3;
}

.service-image-card.white .card-content li::before {
  color: var(--tea-primary);
}

.more-btn {
  width: fit-content;
  border: none;
  border-radius: 6px;
  padding: 5px 10px;
  color: #fff;
  background: rgba(0, 78, 38, .76);
  font-size: .78rem;
  font-weight: 900;
  text-decoration: none;
}

.green { --card-tint: rgba(38, 167, 44, .84); }
.lime { --card-tint: rgba(91, 174, 16, .82); }
.dark-green { --card-tint: rgba(22, 101, 2, .86); }
.teal { --card-tint: rgba(13, 148, 136, .80); }
.blue { --card-tint: rgba(37, 99, 235, .78); }
.orange { --card-tint: rgba(245, 158, 11, .78); }
.purple { --card-tint: rgba(126, 34, 206, .78); }

@media (max-width: 1200px) {
  .service-image-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .service-image-card.featured { grid-column: span 1; }
  .service-tabs-wrap { grid-template-columns: repeat(4, minmax(80px, 1fr)); }
}

@media (max-width: 768px) {
  .service-intro { flex-direction: column; align-items: flex-start; }
  .service-image-grid { grid-template-columns: 1fr; }
  .service-tabs-wrap { grid-template-columns: repeat(2, minmax(80px, 1fr)); }
  .service-image-card { min-height: 360px; }
}
</style>
