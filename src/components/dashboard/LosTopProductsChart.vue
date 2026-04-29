<template>
  <div class="card h-100">
    <div class="card-header">
      <i class="fas fa-trophy text-warning"></i> 热销茶品排行榜 TOP 5
    </div>
    <div class="card-body">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const props = defineProps<{ data?: Record<string, number> }>()
const canvasRef = ref<HTMLCanvasElement>()
let chart: Chart | null = null

function render() {
  if (!canvasRef.value || !props.data) return
  if (chart) chart.destroy()
  chart = new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels: Object.keys(props.data),
      datasets: [{
        label: '累计销量 (件)',
        data: Object.values(props.data),
        backgroundColor: '#4caf50',
        borderRadius: 6,
        barThickness: 15,
      }],
    },
    options: {
      indexAxis: 'y', responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: '#eee' } },
        y: { grid: { display: false } },
      },
    },
  })
}

onMounted(render)
watch(() => props.data, render)
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
.card-body { min-height: 270px; padding: 20px; }
</style>
