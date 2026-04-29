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
        y: { grid: { color: '#eee' }, beginAtZero: true },
      },
    },
  })
}

onMounted(render)
watch(() => props.data, render)
</script>

<style scoped>
.card {
  min-height: 360px;
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
.card-body { position: relative; min-height: 290px; padding: 20px; }
</style>
