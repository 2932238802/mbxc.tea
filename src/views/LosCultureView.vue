<template>
  <Layout>
    <MeteorPage
      kicker="安顶山茶旅体验"
      title="茶文旅 · 在线预约"
      subtitle="从云雾茶园采摘，到非遗炒茶体验，再到亲子研学课程，提前预约你的安顶山一日茶旅"
      :stats="stats"
    >
      <CultureSection />
    </MeteorPage>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/shop/LosLayout.vue'
import CultureSection from '@/components/shop/LosCultureSection.vue'
import MeteorPage from '@/components/shared/LosMeteorPage.vue'

const stats = [
  { value: '3', label: '大体验项目' },
  { value: '10min', label: '快速预约确认' },
  { value: '1v1', label: '行程协助' },
]
</script>
