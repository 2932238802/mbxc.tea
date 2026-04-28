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
        x: { grid: { borderDash: [5, 5] as any, color: '#eee' } },
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
  border: none; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); margin-bottom: 25px;
}
.card-header {
  background-color: #fff; border-bottom: 1px solid #f0f0f0;
  padding: 15px 20px; font-weight: 700; color: var(--tea-dark);
  border-radius: 12px 12px 0 0 !important; display: flex; align-items: center; gap: 10px;
}
</style>
