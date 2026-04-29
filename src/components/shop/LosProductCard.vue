<template>
  <div class="product-card">
    <div class="product-img-wrapper">
      <img v-if="imgSrc" :src="imgSrc" :alt="title">
      <div class="product-badge" v-if="badge">{{ badge }}</div>
      <div v-if="!imgSrc" class="product-img-placeholder">
        <strong>{{ title }}</strong>
        <span>{{ badge || '安顶山茶品' }}</span>
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
  background: var(--tea-surface-soft);
  border: 1px solid var(--tea-border);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--tea-shadow);
  transition: all 0.3s;
  margin-bottom: 20px;
}

.product-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.product-img-wrapper {
  height: 200px;
  background-color: var(--tea-surface-muted);
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

.product-img-placeholder {
  width: calc(100% - 28px);
  height: calc(100% - 28px);
  border: 1px dashed var(--tea-border);
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 18px;
  text-align: center;
  background:
    radial-gradient(circle at top left, var(--tea-primary-soft), transparent 40%),
    var(--tea-surface);
}

.product-img-placeholder strong {
  color: var(--tea-primary);
  font-size: 1.15rem;
  font-weight: 900;
}

.product-img-placeholder span {
  color: var(--tea-text-muted);
  font-size: .86rem;
  font-weight: 700;
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
  color: var(--tea-text);
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-price {
  font-size: 1.2rem;
  font-weight: 800;
  color: #ef4444;
}

.unit {
  font-size: 0.85rem;
  font-weight: 700;
  margin-left: 2px;
}
</style>
