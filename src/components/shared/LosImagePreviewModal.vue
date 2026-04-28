<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">{{ imgTitle }}</h5>
            <a class="btn btn-sm btn-outline-secondary rounded-pill px-3 me-2" :href="imgDownloadHref" download>
              <i class="fas fa-download me-1"></i>下载
            </a>
            <button type="button" class="btn-close" @click="close"></button>
          </div>
          <div class="modal-body p-0">
            <div class="image-preview-viewport" ref="viewportRef" @wheel.prevent="onWheel" @pointerdown="onPointerDown"
              @pointermove="onPointerMove" @pointerup="onPointerUp" @pointercancel="onPointerUp" @dblclick="reset">
              <img ref="imgRef" :src="imgSrc" :alt="imgTitle">
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show" @click="close"></div>
    </div>
  </Teleport>
</template>

<!--------------------------------------------------------->

<script setup lang="ts">
import { useImagePreview } from '@/composables/useImagePreview'

const {
  isOpen, imgSrc, imgTitle, imgDownloadHref, viewportRef, imgRef,
  open, close, reset, onWheel, onPointerDown, onPointerMove, onPointerUp,
} = useImagePreview()

defineExpose({ open, close })
</script>

<!--------------------------------------------------------->
<style scoped>
.modal {
  z-index: 3005;
}

.modal-backdrop {
  z-index: 2995;
}

.image-preview-viewport {
  width: 100%;
  height: 80vh;
  overflow: hidden;
  touch-action: none;
  position: relative;
  background: #0b0f12;
}

.image-preview-viewport img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
  transform-origin: 0 0;
  will-change: transform;
}
</style>
