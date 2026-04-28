<template>
  <div>
    <ShopNavbar />
    <HeroSwiper />
    <div class="container py-5">
      <CultureSection />
      <IndustrySection />
      <TechSection @open-metaverse="showMetaverse = true" />
      <ServiceSection />
    </div>
    <CarbonSection />
    <MarketSection />
    <AppFooter />
    <MetaversePage :visible="showMetaverse" @close="showMetaverse = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ShopNavbar from '@/components/shop/ShopNavbar.vue'
import HeroSwiper from '@/components/shop/HeroSwiper.vue'
import CultureSection from '@/components/shop/CultureSection.vue'
import IndustrySection from '@/components/shop/IndustrySection.vue'
import TechSection from '@/components/shop/TechSection.vue'
import ServiceSection from '@/components/shop/ServiceSection.vue'
import CarbonSection from '@/components/shop/CarbonSection.vue'
import MarketSection from '@/components/shop/MarketSection.vue'
import AppFooter from '@/components/shop/AppFooter.vue'
import MetaversePage from '@/components/shop/MetaversePage.vue'

const showMetaverse = ref(false)
</script>

<style scoped>
.container { max-width: 1140px; }
</style>
