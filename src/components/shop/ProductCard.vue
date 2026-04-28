<template>
  <div class="product-card">
    <div class="product-img-wrapper">
      <img v-if="imgSrc" :src="imgSrc" :alt="title">
      <div class="product-badge" v-if="badge">{{ badge }}</div>
      <div v-if="!imgSrc" class="text-center" style="font-size:3rem;color:#ccc">
        <i class="fas fa-image"></i>
      </div>
    </div>
    <div class="product-body">
      <h3 class="product-title">{{ title }}</h3>
      <div class="d-flex justify-content-between align-items-center">
        <div class="product-price">¥{{ price }}<span v-if="unit" class="text-muted unit">/ {{ unit }}</span></div>
        <button class="btn btn-sm btn-outline-success rounded-pill px-3" @click="$emit('action')">
          {{ actionLabel }}
        </button>
      </div>
    </div>
  </div>
</template>













<script setup lang="ts">

defineProps<{
  imgSrc?: string
  title: string
  price: number | string
  unit?: string
  badge?: string
  actionLabel?: string
}>()

defineEmits<{ action: [] }>()


</script>























<style scoped>
.product-card {
  background: white;
  border: none;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  margin-bottom: 20px;
}

.product-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.product-img-wrapper {
  height: 200px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.product-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--tea-accent);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
}

.product-body {
  padding: 15px;
}

.product-title {
  font-size: 1rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-price {
  font-size: 1.2rem;
  font-weight: 800;
  color: #e53935;
}

.unit {
  font-size: 0.85rem;
  font-weight: 700;
  margin-left: 2px;
}
</style>
