<template>
  <div class="metric-card" :class="`metric-${color}`">
    <div class="metric-icon-box">
      <i :class="['fas', icon]"></i>
    </div>
    <div class="metric-copy">
      <div class="metric-label">{{ label }}</div>
      <h3 class="metric-value">{{ value }}</h3>
      <span class="metric-trend"><i class="fas fa-arrow-up"></i> 较上月稳步提升</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string
  icon: string
  color: 'success' | 'primary' | 'warning' | 'info'
}>()
</script>

<style scoped>
.metric-card {
  min-height: 132px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 26px;
  border: 1px solid rgba(0, 104, 59, 0.08);
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 16px 45px rgba(0, 104, 59, 0.07);
  backdrop-filter: blur(18px);
  transition: transform .22s ease, box-shadow .22s ease;
}

.metric-card::after {
  content: '';
  position: absolute;
  width: 120px;
  height: 120px;
  right: -40px;
  top: -54px;
  border-radius: 50%;
  background: var(--metric-soft);
}

.metric-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 22px 55px rgba(0, 104, 59, 0.12);
}

.metric-icon-box {
  width: 58px;
  height: 58px;
  flex-shrink: 0;
  border-radius: 20px;
  display: grid;
  place-items: center;
  color: var(--metric-color);
  background: var(--metric-soft);
  font-size: 1.42rem;
}

.metric-copy { min-width: 0; }
.metric-label { color: #738177; font-size: .88rem; font-weight: 800; margin-bottom: 5px; }
.metric-value { margin: 0; color: #183629; font-size: 1.85rem; font-weight: 950; letter-spacing: -.03em; }
.metric-trend { display: inline-flex; align-items: center; gap: 4px; margin-top: 7px; color: #6d7d72; font-size: .76rem; font-weight: 700; }
.metric-trend i { color: #12b76a; }

.metric-success { --metric-color: #008d52; --metric-soft: rgba(18, 183, 106, .13); }
.metric-primary { --metric-color: #2563eb; --metric-soft: rgba(37, 99, 235, .12); }
.metric-warning { --metric-color: #f97316; --metric-soft: rgba(249, 115, 22, .13); }
.metric-info { --metric-color: #9333ea; --metric-soft: rgba(147, 51, 234, .12); }
</style>
