<template>
  <router-view />
  <MascotEntry @click="showAiChat = true" />
  <AiChatbot :visible="showAiChat" @close="showAiChat = false" @show-image="handleShowImage" />
  <ImagePreviewModal ref="imagePreviewRef" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MascotEntry from '@/components/shared/MascotEntry.vue'
import AiChatbot from '@/components/shared/AiChatbot.vue'
import ImagePreviewModal from '@/components/shared/ImagePreviewModal.vue'

const showAiChat = ref(false)
const imagePreviewRef = ref<InstanceType<typeof ImagePreviewModal>>()

function handleShowImage(src: string, title: string) {
  imagePreviewRef.value?.open(src, title)
}
</script>

<style>
:root {
  --tea-primary: #00683B;
  --tea-secondary: #4caf50;
  --tea-dark: #1b4d24;
  --tea-light: #f7fcf9;
  --tea-accent: #ffb300;
  --tea-green: #2b7a3b;
}

body {
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Segoe UI', sans-serif;
  color: #333;
  background: #fcfcfc;
  min-height: 100vh;
  overflow-x: hidden;
}
</style>
