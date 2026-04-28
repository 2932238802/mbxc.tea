<template>
  <div class="card">
    <div class="card-body d-flex align-items-center">
      <div class="metric-icon-box" :class="iconBgClass">
        <i :class="['fas', icon]"></i>
      </div>
      <div>
        <div class="metric-label">{{ label }}</div>
        <h3 class="metric-value">{{ value }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  value: string
  icon: string
  color: 'success' | 'primary' | 'warning' | 'info'
}>()

const iconBgClass = computed(() => {
  const map: Record<string, string> = {
    success: 'bg-light-success',
    primary: 'bg-light-primary',
    warning: 'bg-light-warning',
    info: 'bg-light-info',
  }
  return map[props.color] || 'bg-light-success'
})
</script>

<style scoped>
.card {
  border: none; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  margin-bottom: 25px; transition: transform 0.2s ease;
}
.card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.06); }
.metric-icon-box {
  width: 60px; height: 60px; border-radius: 15px;
  display: flex; align-items: center; justify-content: center; font-size: 1.5rem;
  margin-right: 1rem; flex-shrink: 0;
}
.bg-light-success { background-color: #e8f5e9; color: #2e7d32; }
.bg-light-primary { background-color: #e3f2fd; color: #1565c0; }
.bg-light-warning { background-color: #fff8e1; color: #f57f17; }
.bg-light-info { background-color: #f3e5f5; color: #6a1b9a; }
.metric-label { color: #888; font-size: 0.9rem; margin-bottom: 5px; }
.metric-value { font-size: 1.8rem; font-weight: 800; color: #2c3e50; margin: 0; }
</style>
