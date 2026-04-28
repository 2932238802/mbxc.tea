<template>
  <Layout>
    <div class="container py-5">
      <TechSection @open-metaverse="showMetaverse = true" />
    </div>
    <MetaversePage :visible="showMetaverse" @close="showMetaverse = false" />
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Layout from '@/components/shop/Layout.vue'
import TechSection from '@/components/shop/TechSection.vue'
import MetaversePage from '@/components/shop/MetaversePage.vue'

const showMetaverse = ref(false)
</script>
