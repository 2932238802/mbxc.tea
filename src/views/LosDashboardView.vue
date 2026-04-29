<template>
  <div class="dashboard-shell">
    <DashboardSidebar />

    <main class="dashboard-main">
      <header class="dashboard-topbar">
        <div class="topbar-left">
          <router-link to="/" class="back-btn">
            <i class="fas fa-arrow-left"></i>
            返回首页
          </router-link>
          <div>
            <span class="eyebrow">Admin Console</span>
            <h1>产业数据看板</h1>
          </div>
        </div>

        <div class="topbar-right">
          <div class="status-pill">
            <span class="status-dot"></span>
            数据实时同步
          </div>
          <button class="notify-btn" type="button" title="通知">
            <i class="fas fa-bell"></i>
            <span>3</span>
          </button>
          <div class="admin-card">
            <img src="https://ui-avatars.com/api/?name=Admin&background=00683B&color=fff" alt="Admin">
            <div>
              <strong>{{ authStore.displayName || '系统管理员' }}</strong>
              <small>超级管理员</small>
            </div>
          </div>
        </div>
      </header>

      <section v-if="!authStore.isAdmin" class="admin-gate">
        <div class="gate-card">
          <div class="gate-icon"><i class="fas fa-user-shield"></i></div>
          <h2>仅管理员可访问产业大脑</h2>
          <p>请使用管理员账号登录后查看数据看板。</p>
          <router-link to="/login?redirect=/dashboard&admin=1" class="btn btn-success rounded-pill px-4">
            前往管理员登录
          </router-link>
        </div>
      </section>

      <section v-else class="dashboard-content">
        <div class="hero-panel">
          <div>
            <span class="hero-badge"><i class="fas fa-seedling"></i> 安顶山茶产业运营中枢</span>
            <h2>茶产业全链路经营洞察</h2>
            <p>聚合交易订单、茶品结构、客户活跃与销售趋势，为茶园经营和产业决策提供实时参考。</p>
          </div>
          <div class="hero-actions">
            <button class="ghost-btn" type="button" @click="store.fetchData()">
              <i class="fas fa-rotate-right"></i>
              刷新数据
            </button>
            <span class="sync-time">最后更新：{{ nowText }}</span>
          </div>
        </div>

        <div v-if="store.loading" class="state-card">
          <div class="spinner-border text-success" role="status"></div>
          <p>正在加载平台数据...</p>
        </div>

        <div v-else-if="store.error" class="state-card error-state">
          <i class="fas fa-triangle-exclamation"></i>
          <p>{{ store.error }}</p>
          <button class="btn btn-success rounded-pill" @click="store.fetchData()">重新加载</button>
        </div>

        <template v-else-if="store.data">
          <div class="metric-grid">
            <MetricCard label="平台总销售额" :value="formatMoney(store.data.total_sales)" icon="fa-yen-sign" color="success" />
            <MetricCard label="累计订单总量" :value="formatNum(store.data.order_count)" icon="fa-shopping-bag" color="primary" />
            <MetricCard label="平均客单价" :value="formatMoney(store.data.avg_order_value)" icon="fa-chart-bar" color="warning" />
            <MetricCard label="活跃客户数" :value="formatNum(store.data.customer_count)" icon="fa-users" color="info" />
          </div>

          <div class="insight-grid">
            <div class="insight-card primary-insight">
              <div class="insight-icon"><i class="fas fa-arrow-trend-up"></i></div>
              <div>
                <span>本月经营提示</span>
                <strong>云雾茶订单持续增长</strong>
                <p>建议加强精品茶、文旅体验和企业团购的联动转化。</p>
              </div>
            </div>
            <div class="insight-card">
              <div class="insight-icon amber"><i class="fas fa-leaf"></i></div>
              <div>
                <span>库存关注</span>
                <strong>高端茶礼适合补货</strong>
                <p>TOP 商品销量集中，可优先维护主推茶品库存。</p>
              </div>
            </div>
          </div>

          <div class="chart-grid">
            <MonthlySalesChart :data="store.data.monthly_sales" />
            <CategoryChart :data="localizedCategorySales" />
          </div>

          <div class="bottom-grid">
            <TopProductsChart :data="store.data.top_products" />
            <OrdersTable :orders="store.data.recent_orders?.slice(0, 6)" />
          </div>

          <footer class="dashboard-footer">
            &copy; 2026 茗不虚传 - 茶产业数字化服务平台. All Rights Reserved.
          </footer>
        </template>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { useAuthStore } from '@/stores/auth'
import DashboardSidebar from '@/components/dashboard/LosDashboardSidebar.vue'
import MetricCard from '@/components/dashboard/LosMetricCard.vue'
import MonthlySalesChart from '@/components/dashboard/LosMonthlySalesChart.vue'
import CategoryChart from '@/components/dashboard/LosCategoryChart.vue'
import TopProductsChart from '@/components/dashboard/LosTopProductsChart.vue'
import OrdersTable from '@/components/dashboard/LosOrdersTable.vue'

const store = useDashboardStore()
const authStore = useAuthStore()
const nowText = new Date().toLocaleString('zh-CN', { hour12: false })

const localizedCategorySales = computed(() => {
  const map: Record<string, string> = {
    'Green Tea': '安顶云雾绿茶',
    'Black Tea': '安顶红茶',
    'White Tea': '安顶白茶',
  }

  return Object.fromEntries(
    Object.entries(store.data?.category_sales || {}).map(([key, value]) => [map[key] || key, value]),
  )
})

function formatMoney(v: number) { return `¥${v.toLocaleString()}` }
function formatNum(v: number) { return v.toLocaleString() }

onMounted(() => {
  if (authStore.isAdmin) store.fetchData()
})
</script>

<style scoped>
.dashboard-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  background:
    radial-gradient(circle at 18% 8%, rgba(18, 183, 106, 0.12), transparent 28%),
    linear-gradient(rgba(247, 252, 249, 0.76), rgba(247, 252, 249, 0.76)),
    url('/总览.jpg') center / cover fixed;
  color: #193226;
}

.dashboard-main {
  min-width: 0;
  padding: 22px 28px 30px;
}

.dashboard-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  padding: 16px 18px;
  margin-bottom: 22px;
  border: 1px solid rgba(0, 104, 59, 0.08);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 18px 50px rgba(0, 104, 59, 0.08);
  backdrop-filter: blur(18px);
}

.topbar-left,
.topbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-btn,
.ghost-btn {
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  padding: 0 16px;
  color: var(--tea-primary);
  border: 1px solid rgba(0, 104, 59, 0.18);
  background: rgba(255, 255, 255, 0.74);
  text-decoration: none;
  font-weight: 800;
}

.eyebrow {
  color: var(--tea-primary);
  font-size: .78rem;
  font-weight: 900;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.dashboard-topbar h1 {
  margin: 2px 0 0;
  font-size: 1.55rem;
  font-weight: 950;
  color: #153526;
}

.status-pill,
.admin-card,
.notify-btn {
  height: 42px;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(0, 104, 59, 0.10);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.04);
}

.status-pill {
  gap: 8px;
  padding: 0 14px;
  color: #40705a;
  font-size: .86rem;
  font-weight: 800;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #12b76a;
  box-shadow: 0 0 0 5px rgba(18, 183, 106, 0.12);
}

.notify-btn {
  width: 42px;
  justify-content: center;
  position: relative;
  color: #446052;
}

.notify-btn span {
  position: absolute;
  top: -5px;
  right: -3px;
  min-width: 17px;
  height: 17px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  color: #fff;
  background: #dc3545;
  font-size: .65rem;
  font-weight: 900;
}

.admin-card {
  gap: 10px;
  padding: 0 14px 0 5px;
}

.admin-card img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
}

.admin-card strong,
.admin-card small {
  display: block;
  line-height: 1.15;
}

.admin-card strong { font-size: .92rem; }
.admin-card small { color: #6c7c72; font-size: .72rem; }

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.hero-panel {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 28px;
  border-radius: 30px;
  color: #fff;
  background:
    linear-gradient(135deg, rgba(0, 104, 59, .94), rgba(18, 183, 106, .78)),
    url('/数字2.jpg') center / cover;
  box-shadow: 0 24px 70px rgba(0, 104, 59, 0.25);
  overflow: hidden;
}

.hero-badge {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 7px 13px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.18);
  font-weight: 800;
  font-size: .86rem;
}

.hero-panel h2 {
  margin: 14px 0 8px;
  font-size: clamp(1.9rem, 3vw, 3.2rem);
  font-weight: 950;
}

.hero-panel p {
  max-width: 720px;
  margin: 0;
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.8;
}

.hero-actions {
  min-width: 190px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 10px;
}

.hero-actions .ghost-btn {
  color: #fff;
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.28);
}

.sync-time {
  color: rgba(255, 255, 255, 0.78);
  font-size: .78rem;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.insight-grid {
  display: grid;
  grid-template-columns: 1.1fr .9fr;
  gap: 18px;
}

.insight-card {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 20px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(0, 104, 59, 0.08);
  box-shadow: 0 16px 45px rgba(0, 104, 59, 0.07);
  backdrop-filter: blur(18px);
}

.insight-icon {
  width: 54px;
  height: 54px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  color: #fff;
  background: linear-gradient(135deg, #00683B, #12b76a);
  font-size: 1.3rem;
  flex-shrink: 0;
}

.insight-icon.amber { background: linear-gradient(135deg, #ffb300, #f97316); }
.insight-card span { color: #6a7b70; font-size: .82rem; font-weight: 800; }
.insight-card strong { display: block; margin: 2px 0 4px; color: #173426; font-size: 1.08rem; }
.insight-card p { margin: 0; color: #718278; line-height: 1.6; }

.chart-grid,
.bottom-grid {
  display: grid;
  gap: 18px;
}

.chart-grid { grid-template-columns: minmax(0, 1.75fr) minmax(320px, .85fr); }
.bottom-grid { grid-template-columns: minmax(320px, .95fr) minmax(0, 1.4fr); }

.state-card,
.admin-gate {
  min-height: 52vh;
  display: grid;
  place-items: center;
}

.state-card,
.gate-card {
  text-align: center;
  padding: 38px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.84);
  border: 1px solid rgba(0, 104, 59, 0.10);
  box-shadow: 0 18px 55px rgba(0, 104, 59, 0.10);
}

.gate-icon {
  width: 74px;
  height: 74px;
  margin: 0 auto 18px;
  display: grid;
  place-items: center;
  border-radius: 24px;
  color: #fff;
  background: linear-gradient(135deg, #00683B, #12b76a);
  font-size: 1.8rem;
}

.gate-card h2 { color: #163c29; font-weight: 900; }
.gate-card p { color: #6b7c71; }
.error-state i { color: #dc3545; font-size: 2rem; margin-bottom: 8px; }

.dashboard-footer {
  text-align: center;
  color: #748277;
  padding: 10px 0 4px;
  font-size: .88rem;
}

@media (max-width: 1180px) {
  .dashboard-shell { grid-template-columns: 1fr; }
  .dashboard-main { padding: 18px; }
  .metric-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .chart-grid,
  .bottom-grid,
  .insight-grid { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .dashboard-topbar,
  .hero-panel { flex-direction: column; align-items: stretch; }
  .topbar-right { flex-wrap: wrap; }
  .hero-actions { align-items: flex-start; }
  .metric-grid { grid-template-columns: 1fr; }
}
</style>
