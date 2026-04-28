<template>
  <div class="card h-100">
    <div class="card-header">
      <i class="fas fa-chart-pie text-success"></i> 茶叶品类销售占比
    </div>
    <div class="card-body d-flex justify-content-center align-items-center">
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
    type: 'doughnut',
    data: {
      labels: Object.keys(props.data),
      datasets: [{
        data: Object.values(props.data),
        backgroundColor: ['#2b7a3b', '#4caf50', '#81c784', '#ffb300', '#f57c00', '#8d6e63'],
        borderWidth: 2, borderColor: '#fff',
      }],
    },
    options: {
      responsive: true, cutout: '65%',
      plugins: {
        legend: { position: 'bottom', labels: { padding: 20, usePointStyle: true, pointStyle: 'circle' } },
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
