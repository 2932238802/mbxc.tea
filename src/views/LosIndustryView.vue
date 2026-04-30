<template>
  <Layout>
    <MeteorPage
      kicker="数字茶园 · 未来茶场"
      title="茶产业"
      subtitle="数字感知茶园生产、加工、销售与管理全流程"
      :stats="stats"
      :bg-image="assetUrl('总览.jpg')"
    >
      <IndustrySection />
    </MeteorPage>
  </Layout>
</template>

<script setup lang="ts">
import { assetUrl } from '@/utils/asset'
import Layout from '@/components/shop/LosLayout.vue'
import IndustrySection from '@/components/shop/LosIndustrySection.vue'
import MeteorPage from '@/components/shared/LosMeteorPage.vue'

const stats = [
  { value: '350亩', label: '核心茶园' },
  { value: 'IoT', label: '全域感知' },
  { value: 'AI', label: '智能决策' },
]
</script>
