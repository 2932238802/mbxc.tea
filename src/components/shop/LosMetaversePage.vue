<template>
  <Teleport to="body">
    <div v-if="visible" class="overlay-page is-open">
      <div class="overlay-header">
        <div class="overlay-title">
          <i class="fas fa-vr-cardboard"></i>
          茶园元宇宙 · 实景 VR
        </div>
        <button class="btn btn-sm btn-outline-secondary rounded-pill px-3" @click="$emit('close')">
          <i class="fas fa-times me-1"></i>关闭
        </button>
      </div>
      <div class="overlay-body">
        <div class="overlay-container">
          <div id="metaverseCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button v-for="(_, i) in vrScenes" :key="i" type="button"
                data-bs-target="#metaverseCarousel" :data-bs-slide-to="i"
                :class="{ active: i === 0 }"></button>
            </div>
            <div class="carousel-inner">
              <div v-for="(scene, i) in vrScenes" :key="i"
                class="carousel-item" :class="{ active: i === 0 }">
                <div class="vr-frame">
                  <img class="vr-img" :src="scene.src" :alt="scene.label">
                  <div class="vr-label">{{ scene.label }}</div>
                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#metaverseCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#metaverseCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{ visible: boolean }>()
defineEmits<{ close: [] }>()

watch(() => props.visible, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})

const vrScenes = [
  { src: '/城市书屋.jpg', label: '城市书屋' },
  { src: '/古树群公园.jpg', label: '古树群公园' },
  { src: '/松香茶径.jpg', label: '松香茶径' },
  { src: '/以茶代酒.jpg', label: '以茶代酒' },
  { src: '/游客服务中心.jpg', label: '游客服务中心' },
]
</script>

<style scoped>
.overlay-page {
  position: fixed; inset: 0; z-index: 2000;
  background: rgba(247, 252, 249, 0.95); backdrop-filter: blur(10px);
}
.overlay-header {
  position: sticky; top: 0; z-index: 1; background: rgba(255,255,255,0.86);
  border-bottom: 1px solid rgba(0,0,0,0.08); padding: 12px 16px;
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
}
.overlay-title { display: flex; align-items: center; gap: 10px; font-weight: 800; color: var(--tea-primary); }
.overlay-body { overflow: hidden; padding: 12px 12px 16px; height: calc(100vh - 58px); }
.overlay-container { height: calc(100vh - 58px - 28px); display: flex; align-items: center; max-width: 1080px; margin: 0 auto; }
.vr-frame {
  position: relative; border-radius: 18px; overflow: hidden;
  background: #0b0f12; box-shadow: 0 14px 30px rgba(0,0,0,0.22); height: 100%;
}
.vr-frame::before, .vr-frame::after {
  content: ''; position: absolute; top: 50%; width: 46%; height: 78%;
  transform: translateY(-50%); border: 6px solid rgba(255,255,255,0.18);
  border-radius: 999px; pointer-events: none;
  box-shadow: inset 0 0 0 999px rgba(0,0,0,0.16);
}
.vr-frame::before { left: 4%; }
.vr-frame::after { right: 4%; }
.vr-img { width: 100%; height: 100%; object-fit: contain; display: block; }
.vr-label {
  position: absolute; left: 14px; bottom: 12px;
  background: rgba(0,0,0,0.55); color: #fff; padding: 6px 10px;
  border-radius: 999px; font-weight: 700; font-size: 0.95rem;
}
#metaverseCarousel, #metaverseCarousel .carousel-inner, #metaverseCarousel .carousel-item { height: 100%; }
</style>
