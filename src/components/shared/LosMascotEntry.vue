<template>
  <div class="mascot-entry" title="AI 客服 · 茶小泽">
    <img class="mascot-img" :src="assetUrl('茶小泽2.png')" alt="茶小泽">
    <div class="mascot-hint">Hi～我是茶小泽，关于安顶山茶产业的任何问题，尽管问我噢！</div>
  </div>
</template>
<!--------------------------------------------------------->



<script setup lang="ts">
import { assetUrl } from '@/utils/asset'

</script>






<!--------------------------------------------------------->
<style scoped>
.mascot-entry {
  position: fixed;
  right: 18px;
  bottom: 18px;
  width: 170px;
  z-index: 1200;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.mascot-img {
  width: 100%;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.18);
  transition: transform 0.2s ease;
}

.mascot-entry:hover .mascot-img {
  transform: translateY(-2px);
}

.mascot-hint {
  width: 100%;
  text-align: center;
  font-size: 0.78rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.62);
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 999px;
  padding: 6px 10px;
  backdrop-filter: blur(8px);
}

@media (max-width: 576px) {
  .mascot-entry {
    width: 120px;
    right: 12px;
    bottom: 12px;
  }
}
</style>
