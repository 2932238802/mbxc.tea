<template>
  <Layout>
    <MeteorPage
      kicker="云雾茶 · 文创周边"
      title="交易中心"
      subtitle="安顶云雾茶预定、茶小泽文创周边"
      :stats="stats"
    >
      <MarketSection />
    </MeteorPage>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/shop/LosLayout.vue'
import MarketSection from '@/components/shop/LosMarketSection.vue'
import MeteorPage from '@/components/shared/LosMeteorPage.vue'

const stats = [
  { value: '4档', label: '茶品等级' },
  { value: '4款', label: '文创周边' },
  { value: 'Cart', label: '购物车' },
]
</script>
