<template>
  <section id="service" class="mb-5">
    <div class="section-title-wrapper">
      <h2 class="section-title">茶服务</h2>
      <ul class="nav section-tabs">
        <li class="nav-item" v-for="tab in tabs" :key="tab.key">
          <button
            type="button"
            class="nav-link"
            :class="{ active: activeTab === tab.key }"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </li>
      </ul>
    </div>

    <div class="service-hero mb-4">
      <div>
        <span class="service-badge">{{ currentTab.badge }}</span>
        <h3 class="fw-bold mt-3 mb-2">{{ currentTab.title }}</h3>
        <p class="text-muted mb-0">{{ currentTab.description }}</p>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-md-4" v-for="item in currentServices" :key="item.title">
        <div class="service-card">
          <div class="service-icon" :class="item.iconClass">
            <i :class="['fas', item.icon]"></i>
          </div>
          <h5 class="service-title border-bottom pb-2 mb-3">{{ item.title }}</h5>
          <p class="service-desc mb-3">{{ item.desc }}</p>
          <ul class="service-points">
            <li v-for="point in item.points" :key="point">{{ point }}</li>
          </ul>
          <a href="" @click.prevent class="btn btn-sm btn-outline-secondary rounded-pill mt-2">了解详情</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type TabKey = 'brand' | 'finance' | 'research'

const activeTab = ref<TabKey>('brand')

const tabs = [
  {
    key: 'brand' as const,
    label: '品牌服务',
    badge: '品牌增长',
    title: '品牌服务 · 从定位到渠道的完整增长方案',
    description: '围绕安顶云雾茶区域品牌、茶企品牌与文旅品牌，提供品牌定位、视觉包装、营销推广和渠道对接服务',
  },
  {
    key: 'finance' as const,
    label: '茶金融',
    badge: '供应链金融',
    title: '茶金融 · 基于真实交易数据的普惠金融服务',
    description: '沉淀茶园、库存、订单和销售数据，为茶企、合作社和茶农提供授信评估、订单融资、库存融资等金融服务入口',
  },
  {
    key: 'research' as const,
    label: '市场调研',
    badge: '数据洞察',
    title: '市场调研 · 以消费者洞察辅助茶企经营决策',
    description: '通过用户画像、渠道反馈、价格带分析和竞品研究，帮助茶企判断市场机会、优化产品结构和营销策略',
  },
]

const services: Record<TabKey, Array<{
  title: string
  desc: string
  icon: string
  iconClass: string
  points: string[]
}>> = {
  brand: [
    {
      title: '品牌定位与价值表达',
      icon: 'fa-bullhorn',
      iconClass: 'icon-red',
      desc: '基于品牌发展愿景，提炼核心卖点、品牌故事和视觉风格，形成统一的对外表达体系',
      points: ['品牌主张梳理', '品牌故事包装', '视觉符号与礼盒策略'],
    },
    {
      title: '营销活动与渠道对接',
      icon: 'fa-store',
      iconClass: 'icon-green',
      desc: '策划品牌发布会、节庆促销、直播活动和线下推介会，对接线上电商与本地文旅渠道',
      points: ['直播电商策划', '茶文旅联名活动', '企业团购渠道'],
    },
    {
      title: '内容传播与私域运营',
      icon: 'fa-comments',
      iconClass: 'icon-blue',
      desc: '围绕产地、非遗工艺、茶园风景和茶小泽IP，持续生成内容资产，提升品牌复购与用户粘性',
      points: ['短视频脚本', '公众号内容', '会员复购运营'],
    },
  ],
  finance: [
    {
      title: '茶园贷',
      icon: 'fa-seedling',
      iconClass: 'icon-green',
      desc: '基于茶园面积、历史产量、种植数据和经营记录，为茶农与合作社提供生产经营资金支持',
      points: ['茶园资产评估', '农事数据佐证', '生产资金周转'],
    },
    {
      title: '订单贷',
      icon: 'fa-file-invoice-dollar',
      iconClass: 'icon-orange',
      desc: '基于真实订单、预售记录和客户采购合同，为茶企提供订单履约所需的短期资金支持',
      points: ['订单真实性核验', '回款周期评估', '发货批次管理'],
    },
    {
      title: '库存与仓单融资',
      icon: 'fa-warehouse',
      iconClass: 'icon-purple',
      desc: '结合茶叶库存、等级、仓储记录和销售行情，对优质茶品进行价值评估和融资服务衔接',
      points: ['库存数字化盘点', '茶品等级评估', '仓储流转记录'],
    },
  ],
  research: [
    {
      title: '消费者画像分析',
      icon: 'fa-users',
      iconClass: 'icon-blue',
      desc: '分析购买人群、地域分布、消费频次和价格偏好，帮助茶企识别核心客群',
      points: ['用户年龄层', '区域消费偏好', '复购行为分析'],
    },
    {
      title: '产品价格带研究',
      icon: 'fa-chart-line',
      iconClass: 'icon-green',
      desc: '围绕不同等级茶品、礼盒组合和文创联名产品，分析适合的价格区间和销售策略',
      points: ['茶品等级定价', '礼盒组合策略', '促销敏感度分析'],
    },
    {
      title: '竞品与渠道调研',
      icon: 'fa-magnifying-glass-chart',
      iconClass: 'icon-red',
      desc: '跟踪区域名茶、线上店铺、文旅消费和企业团购市场，辅助茶企制定差异化打法',
      points: ['竞品卖点拆解', '渠道结构分析', '市场机会判断'],
    },
  ],
}

const currentTab = computed(() => tabs.find(tab => tab.key === activeTab.value)!)
const currentServices = computed(() => services[activeTab.value])
</script>

<style scoped>
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

.section-tabs .nav-link {
  color: #666 !important;
  border: none;
  background: none;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 999px;
}

.section-tabs .nav-link.active {
  color: var(--tea-primary) !important;
  background: rgba(0, 104, 59, 0.1);
  font-weight: 800;
}

.service-hero {
  background: linear-gradient(135deg, rgba(0, 104, 59, 0.1), rgba(255, 255, 255, 0.96));
  border: 1px solid rgba(0, 104, 59, 0.1);
  border-radius: 18px;
  padding: 26px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
}

.service-badge {
  display: inline-block;
  background: rgba(0, 104, 59, 0.12);
  color: var(--tea-primary);
  border-radius: 999px;
  padding: 6px 14px;
  font-weight: 800;
  font-size: 0.86rem;
}

.service-card {
  background: white;
  border-radius: 14px;
  padding: 22px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  transition: all 0.3s;
  height: 100%;
  border: 1px solid #eee;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  border-color: var(--tea-primary);
}

.service-icon {
  width: 52px;
  height: 52px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  font-size: 1.35rem;
}

.icon-green { background: #e8f5e9; color: #2e7d32; }
.icon-blue { background: #e3f2fd; color: #1565c0; }
.icon-red { background: #ffebee; color: #c62828; }
.icon-orange { background: #fff8e1; color: #f57f17; }
.icon-purple { background: #f3e5f5; color: #6a1b9a; }

.service-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #333;
}

.service-desc {
  font-size: 0.9rem;
  color: #777;
  line-height: 1.75;
}

.service-points {
  list-style: none;
  padding: 0;
  margin: 0;
}

.service-points li {
  position: relative;
  padding-left: 18px;
  color: #666;
  font-size: 0.88rem;
  margin-bottom: 7px;
}

.service-points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--tea-primary);
}
</style>
