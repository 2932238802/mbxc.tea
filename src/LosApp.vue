<template>
  <router-view />
  <MascotEntry @click="showAiChat = true" />
  <AiChatbot :visible="showAiChat" @close="showAiChat = false" @show-image="handleShowImage" />
  <ImagePreviewModal ref="imagePreviewRef" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MascotEntry from '@/components/shared/LosMascotEntry.vue'
import AiChatbot from '@/components/shared/LosAiChatbot.vue'
import ImagePreviewModal from '@/components/shared/LosImagePreviewModal.vue'
import { useThemeStore } from '@/stores/theme'

useThemeStore()

const showAiChat = ref(false)
const imagePreviewRef = ref<InstanceType<typeof ImagePreviewModal>>()

function handleShowImage(src: string, title: string) {
  imagePreviewRef.value?.open(src, title)
}
</script>

<style>
:root {
  color-scheme: light;
  --tea-primary: #00683B;
  --tea-secondary: #4caf50;
  --tea-dark: #1b4d24;
  --tea-light: #f7fcf9;
  --tea-accent: #ffb300;
  --tea-green: #2b7a3b;

  --tea-bg: #fcfcfc;
  --tea-page-bg: #f7fcf9;
  --tea-surface: #ffffff;
  --tea-surface-soft: rgba(255, 255, 255, 0.92);
  --tea-surface-muted: #f8f9fa;
  --tea-text: #333333;
  --tea-text-muted: #6c757d;
  --tea-border: #eeeeee;
  --tea-navbar-bg: rgba(255, 255, 255, 0.96);
  --tea-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  --tea-primary-soft: rgba(0, 104, 59, 0.10);
  --tea-overlay-bg: rgba(247, 252, 249, 0.95);
}

:root[data-theme="dark"] {
  color-scheme: dark;
  --tea-primary: #4ade80;
  --tea-secondary: #22c55e;
  --tea-dark: #dcfce7;
  --tea-light: #0f1f17;
  --tea-accent: #fbbf24;
  --tea-green: #86efac;

  --tea-bg: #08120d;
  --tea-page-bg: #0b1711;
  --tea-surface: #111f17;
  --tea-surface-soft: rgba(17, 31, 23, 0.94);
  --tea-surface-muted: #14251b;
  --tea-text: #e8f5ed;
  --tea-text-muted: #a8b8ae;
  --tea-border: rgba(255, 255, 255, 0.10);
  --tea-navbar-bg: rgba(9, 20, 14, 0.96);
  --tea-shadow: 0 18px 45px rgba(0, 0, 0, 0.42);
  --tea-primary-soft: rgba(74, 222, 128, 0.14);
  --tea-overlay-bg: rgba(8, 18, 13, 0.96);
}

body {
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Segoe UI', sans-serif;
  color: var(--tea-text);
  background: var(--tea-bg);
  min-height: 100vh;
  overflow-x: hidden;
  transition: color .2s ease, background-color .2s ease;
}

body .text-muted {
  color: var(--tea-text-muted) !important;
}

body .bg-light {
  background-color: var(--tea-surface-muted) !important;
}

body .card,
body .modal-content,
body .accordion-item,
body .list-group-item,
body .dropdown-menu {
  color: var(--tea-text);
  background-color: var(--tea-surface);
  border-color: var(--tea-border);
}

body .form-control,
body .form-select {
  color: var(--tea-text);
  background-color: var(--tea-surface);
  border-color: var(--tea-border);
}

body .form-control::placeholder {
  color: var(--tea-text-muted);
}

body .form-control:focus,
body .form-select:focus {
  color: var(--tea-text);
  background-color: var(--tea-surface);
  border-color: var(--tea-primary);
  box-shadow: 0 0 0 .25rem var(--tea-primary-soft);
}

body .accordion-button {
  color: var(--tea-text);
  background-color: var(--tea-surface);
}

body .accordion-button:not(.collapsed) {
  color: var(--tea-primary);
  background-color: var(--tea-primary-soft);
}

body .btn-outline-success {
  color: var(--tea-primary);
  border-color: var(--tea-primary);
}

body .btn-outline-success:hover,
body .btn-outline-success:focus {
  color: var(--tea-surface);
  background-color: var(--tea-primary);
  border-color: var(--tea-primary);
}

body .btn-success {
  color: #fff;
  background-color: var(--tea-primary);
  border-color: var(--tea-primary);
}

body .btn-success:hover,
body .btn-success:focus {
  filter: brightness(1.06);
  background-color: var(--tea-primary);
  border-color: var(--tea-primary);
}

body .btn-outline-secondary {
  color: var(--tea-text-muted);
  border-color: var(--tea-border);
}

body .btn-outline-secondary:hover,
body .btn-outline-secondary:focus {
  color: var(--tea-text);
  background-color: var(--tea-surface-muted);
  border-color: var(--tea-border);
}

body .table {
  --bs-table-color: var(--tea-text);
  --bs-table-bg: var(--tea-surface);
  --bs-table-border-color: var(--tea-border);
}

body .alert-danger {
  color: #fecaca;
  background-color: rgba(127, 29, 29, 0.45);
  border-color: rgba(248, 113, 113, 0.28);
}

:root:not([data-theme="dark"]) body .alert-danger {
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
}

body .alert-success {
  color: #bbf7d0;
  background-color: rgba(20, 83, 45, 0.45);
  border-color: rgba(74, 222, 128, 0.28);
}

:root:not([data-theme="dark"]) body .alert-success {
  color: #0f5132;
  background-color: #d1e7dd;
  border-color: #badbcc;
}

body a {
  transition: color .2s ease, background-color .2s ease, border-color .2s ease;
}
</style>
