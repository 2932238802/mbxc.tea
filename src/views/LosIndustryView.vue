<template>
  <Layout>
    <MeteorPage
      kicker="数字茶园 · 未来茶场"
      title="茶产业"
      subtitle="以物联网、遥感、AI 决策与产业大脑构建安顶山数字茶园，让茶园生产、加工、销售和管理可感知、可分析、可协同"
      :stats="stats"
    >
      <IndustrySection />
    </MeteorPage>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/shop/LosLayout.vue'
import IndustrySection from '@/components/shop/LosIndustrySection.vue'
import MeteorPage from '@/components/shared/LosMeteorPage.vue'

const stats = [
  { value: '350亩', label: '核心茶园' },
  { value: 'IoT', label: '全域感知' },
  { value: 'AI', label: '智能决策' },
]
</script>
