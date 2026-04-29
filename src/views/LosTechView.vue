<template>
  <Layout>
    <MeteorPage
      kicker="茶科技 · 数字硬件"
      title="茶科技"
      subtitle="围绕溯源秤、茶标机、智能硬件和茶园元宇宙，构建从生产现场到消费者端的可信数字链路"
      :stats="stats"
    >
      <TechSection @open-metaverse="showMetaverse = true" />
    </MeteorPage>
    <MetaversePage :visible="showMetaverse" @close="showMetaverse = false" />
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Layout from '@/components/shop/LosLayout.vue'
import TechSection from '@/components/shop/LosTechSection.vue'
import MetaversePage from '@/components/shop/LosMetaversePage.vue'
import MeteorPage from '@/components/shared/LosMeteorPage.vue'

const showMetaverse = ref(false)
const stats = [
  { value: '1码', label: '一物一码' },
  { value: 'IoT', label: '硬件集成' },
  { value: 'VR', label: '沉浸体验' },
]
</script>
