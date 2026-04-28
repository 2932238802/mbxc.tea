<template>
  <div class="container-fluid p-0">
    <div class="row g-0">
      <DashboardSidebar />
      <div class="col-md-10 page-surface">
        <div class="top-navbar d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-3">
            <router-link to="/" class="btn btn-sm btn-outline-success rounded-pill px-3">
              <i class="fas fa-arrow-left me-1"></i>返回
            </router-link>
            <h4 class="m-0 text-dark fw-bold">数据大屏看板</h4>
          </div>
          <div class="d-flex align-items-center gap-3">
            <div class="position-relative">
              <i class="fas fa-bell text-muted fs-5"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size:0.5rem;padding:3px 5px">3</span>
            </div>
            <div class="d-flex align-items-center gap-2" style="cursor:pointer">
              <img src="https://ui-avatars.com/api/?name=Admin&background=2b7a3b&color=fff" class="rounded-circle" width="35" height="35" alt="User">
              <span class="fw-medium">系统管理员 <i class="fas fa-angle-down ms-1 text-muted"></i></span>
            </div>
          </div>
        </div>

        <div class="px-4">
          <div v-if="store.loading" class="text-center py-5">
            <div class="spinner-border text-success" role="status"></div>
            <p class="mt-2 text-muted">正在加载平台数据...</p>
          </div>
          <div v-else-if="store.error" class="text-center py-5">
            <p class="text-danger">{{ store.error }}</p>
            <button class="btn btn-success rounded-pill" @click="store.fetchData()">重新加载</button>
          </div>

          <template v-else-if="store.data">
            <div class="row">
              <div class="col-md-3 col-sm-6">
                <MetricCard label="平台总销售额" :value="formatMoney(store.data.total_sales)" icon="fa-yen-sign" color="success" />
              </div>
              <div class="col-md-3 col-sm-6">
                <MetricCard label="累计订单总量" :value="formatNum(store.data.order_count)" icon="fa-shopping-bag" color="primary" />
              </div>
              <div class="col-md-3 col-sm-6">
                <MetricCard label="平均客单价" :value="formatMoney(store.data.avg_order_value)" icon="fa-chart-bar" color="warning" />
              </div>
              <div class="col-md-3 col-sm-6">
                <MetricCard label="活跃客户数" :value="formatNum(store.data.customer_count)" icon="fa-users" color="info" />
              </div>
            </div>

            <div class="row">
              <div class="col-md-8">
                <MonthlySalesChart :data="store.data.monthly_sales" />
              </div>
              <div class="col-md-4">
                <CategoryChart :data="store.data.category_sales" />
              </div>
            </div>

            <div class="row mt-4">
              <div class="col-md-5">
                <TopProductsChart :data="store.data.top_products" />
              </div>
              <div class="col-md-7">
                <OrdersTable :orders="store.data.recent_orders?.slice(0, 6)" />
              </div>
            </div>

            <div class="text-center text-muted py-4 mt-2" style="font-size:0.9rem">
              &copy; 2026 茗不虚传 - 茶产业数字化服务平台. All Rights Reserved.
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<!---------------------------------------------------------->

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import DashboardSidebar from '@/components/dashboard/LosDashboardSidebar.vue'
import MetricCard from '@/components/dashboard/LosMetricCard.vue'
import MonthlySalesChart from '@/components/dashboard/LosMonthlySalesChart.vue'
import CategoryChart from '@/components/dashboard/LosCategoryChart.vue'
import TopProductsChart from '@/components/dashboard/LosTopProductsChart.vue'
import OrdersTable from '@/components/dashboard/LosOrdersTable.vue'
const store = useDashboardStore()
function formatMoney(v: number) { return `¥${v.toLocaleString()}` }
function formatNum(v: number) { return v.toLocaleString() }
onMounted(() => store.fetchData())
</script>

<!---------------------------------------------------------->

<style scoped>
.page-surface {
  min-height: 100vh;
  background-color: rgba(245, 247, 245, 0.78);
  backdrop-filter: blur(8px);
  background-color: rgba(245, 247, 245, 0.78);
}
.top-navbar {
  background: #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.02);
  padding: 15px 30px; border-radius: 0 0 15px 15px; margin-bottom: 25px;
}
</style>
