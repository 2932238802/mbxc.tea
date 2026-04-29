<template>
  <div class="card h-100">
    <div class="card-header d-flex justify-content-between align-items-center">
      <div><i class="fas fa-list-alt text-info"></i> 实时订单监控</div>
      <button class="btn btn-sm btn-outline-success">查看全部</button>
    </div>
    <div class="card-body p-0">
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead class="bg-light">
            <tr>
              <th>订单编号</th>
              <th>客户名称</th>
              <th>交易金额</th>
              <th>下单时间</th>
              <th>订单状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td class="fw-medium text-primary">#ORD-{{ String(order.id).padStart(4, '0') }}</td>
              <td>{{ order.customer }}</td>
              <td class="fw-bold text-dark">¥{{ order.amount.toLocaleString() }}</td>
              <td class="text-muted"><small><i class="far fa-clock"></i> {{ order.date }}</small></td>
              <td>
                <span class="badge" :class="statusClass(order.status)">{{ statusText(order.status) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  orders?: Array<{ id: number; customer: string; amount: number; status: string; date: string }>
}>()

function statusText(status: string): string {
  const map: Record<string, string> = {
    Completed: '已完成',
    Shipped: '已发货',
    Processing: '处理中',
    Cancelled: '已取消',
  }
  return map[status] || status
}

function statusClass(status: string): string {
  const map: Record<string, string> = {
    Completed: 'bg-success bg-opacity-10 text-success border border-success',
    Shipped: 'bg-primary bg-opacity-10 text-primary border border-primary',
    Processing: 'bg-warning bg-opacity-10 text-warning border border-warning',
    Cancelled: 'bg-danger bg-opacity-10 text-danger border border-danger',
  }
  return map[status] || 'bg-secondary bg-opacity-10 text-secondary border border-secondary'
}
</script>

<style scoped>
.card {
  min-height: 340px;
  border: 1px solid rgba(0, 104, 59, 0.08);
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 16px 45px rgba(0, 104, 59, 0.07);
  backdrop-filter: blur(18px);
  overflow: hidden;
  margin-bottom: 0;
}
.card-header {
  background: rgba(255, 255, 255, 0.68);
  border-bottom: 1px solid rgba(0, 104, 59, 0.08);
  padding: 17px 20px;
  font-weight: 900;
  color: #163c29;
  display: flex;
  align-items: center;
  gap: 10px;
}
.card-header .btn { border-radius: 999px; font-weight: 800; }
.table { margin-bottom: 0; --bs-table-bg: transparent; }
.table th { border-top: none; color: #7b8a81; font-weight: 900; padding: 14px 16px; background: rgba(248, 252, 250, .78); }
.table td { padding: 15px 16px; vertical-align: middle; color: #344a3d; border-color: rgba(0, 104, 59, .06); }
.badge { padding: 6px 12px; border-radius: 999px; font-weight: 800; }
</style>
