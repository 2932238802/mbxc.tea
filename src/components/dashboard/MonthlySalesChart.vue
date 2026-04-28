<template>
  <div class="card h-100">
    <div class="card-header">
      <i class="fas fa-chart-area text-primary"></i> 平台月度销售走势
    </div>
    <div class="card-body">
      <canvas ref="canvasRef" height="100"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
Chart.defaults.font.family = "'PingFang SC', 'Microsoft YaHei', 'Segoe UI', sans-serif"
Chart.defaults.color = '#666'

const props = defineProps<{ data?: Record<string, number> }>()
const canvasRef = ref<HTMLCanvasElement>()
let chart: Chart | null = null

function render() {
  if (!canvasRef.value || !props.data) return
  if (chart) chart.destroy()

  const ctx = canvasRef.value.getContext('2d')!
  const gradient = ctx.createLinearGradient(0, 0, 0, 400)
  gradient.addColorStop(0, 'rgba(43, 122, 59, 0.4)')
  gradient.addColorStop(1, 'rgba(43, 122, 59, 0.0)')

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Object.keys(props.data),
      datasets: [{
        label: '平台销售额 (元)',
        data: Object.values(props.data),
        borderColor: '#2b7a3b',
        backgroundColor: gradient,
        borderWidth: 3,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#2b7a3b',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: true,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: 'rgba(0,0,0,0.8)', padding: 12, displayColors: false },
      },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { borderDash: [5, 5] as any, color: '#eee' }, beginAtZero: true },
      },
    },
  })
}

onMounted(render)
watch(() => props.data, render)
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
.card-body { position: relative; }
</style>
