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
                <span class="badge" :class="statusClass(order.status)">{{ order.status }}</span>
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
  border: none; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); margin-bottom: 25px;
}
.card-header {
  background-color: #fff; border-bottom: 1px solid #f0f0f0;
  padding: 15px 20px; font-weight: 700; color: var(--tea-dark);
  border-radius: 12px 12px 0 0 !important; display: flex; align-items: center; gap: 10px;
}
.table { margin-bottom: 0; }
.table th { border-top: none; color: #888; font-weight: 600; padding: 12px 15px; }
.table td { padding: 15px; vertical-align: middle; color: #444; }
.badge { padding: 6px 12px; border-radius: 6px; font-weight: 500; }
</style>
