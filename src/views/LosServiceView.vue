<template>
  <Layout>
    <MeteorPage
      kicker="品牌 · 金融 · 调研"
      title="茶服务"
      subtitle="面向茶企、合作社、茶农和文旅经营主体，提供品牌增长、茶金融、市场调研和供应链协同服务"
      :stats="stats"
    >
      <ServiceSection />
    </MeteorPage>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/shop/LosLayout.vue'
import ServiceSection from '@/components/shop/LosServiceSection.vue'
import MeteorPage from '@/components/shared/LosMeteorPage.vue'

const stats = [
  { value: '3类', label: '核心服务' },
  { value: 'B端', label: '企业赋能' },
  { value: '数据', label: '辅助决策' },
]
</script>
