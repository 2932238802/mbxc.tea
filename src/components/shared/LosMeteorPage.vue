<template>
  <section class="meteor-page">
    <div
      v-if="bgImage"
      class="meteor-bg-image"
      :style="{ backgroundImage: `url(${bgImage})` }"
      aria-hidden="true"
    ></div>

    <div class="meteor-layer" aria-hidden="true">
      <span v-for="n in 7" :key="n" :class="['meteor', `meteor-${n}`]"></span>
    </div>

    <div class="container py-5 position-relative">
      <div class="page-hero mb-4">
        <div>
          <span class="hero-kicker">{{ kicker }}</span>
          <h1 class="hero-title">{{ title }}</h1>
          <p class="hero-desc">{{ subtitle }}</p>
        </div>

        <div v-if="stats?.length" class="hero-stats">
          <div
            class="hero-stat"
            :class="{ clickable: stat.action === 'openCart' }"
            v-for="stat in stats"
            :key="stat.label"
            @click="handleStatClick(stat)"
          >
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </div>
        </div>
      </div>

      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  kicker: string
  title: string
  subtitle: string
  stats?: Array<{ value: string; label: string; action?: 'openCart' }>
  bgImage?: string
}>()

function handleStatClick(stat: { action?: 'openCart' }) {
  if (stat.action === 'openCart') {
    window.dispatchEvent(new CustomEvent('open-cart'))
  }
}
</script>

<style scoped>
.meteor-page {
  position: relative;
  min-height: calc(100vh - 76px);
  overflow: hidden;
  background:
    radial-gradient(circle at 16% 10%, rgba(74, 222, 128, 0.14), transparent 28%),
    radial-gradient(circle at 82% 18%, rgba(251, 191, 36, 0.08), transparent 24%),
    radial-gradient(circle at 50% 86%, rgba(34, 197, 94, 0.08), transparent 30%),
    linear-gradient(180deg, rgba(247, 252, 249, 0.78), rgba(252, 252, 252, 0.78));
  backdrop-filter: blur(8px);
}

:root[data-theme="dark"] .meteor-page {
  background:
    radial-gradient(circle at 16% 10%, rgba(74, 222, 128, 0.10), transparent 28%),
    radial-gradient(circle at 82% 18%, rgba(251, 191, 36, 0.06), transparent 24%),
    radial-gradient(circle at 50% 86%, rgba(34, 197, 94, 0.06), transparent 30%),
    linear-gradient(180deg, rgba(11, 23, 17, 0.86), rgba(8, 18, 13, 0.86));
}

.meteor-page::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.26;
  background-image:
    linear-gradient(rgba(255, 255, 255, .035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, .035) 1px, transparent 1px);
  background-size: 46px 46px;
  mask-image: radial-gradient(circle at center, #000 0%, transparent 72%);
}

.meteor-bg-image {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-size: cover;
  background-position: center top;
  background-repeat: repeat-y;
  opacity: 0.15;
  mask-image: radial-gradient(ellipse at center, #000 40%, transparent 85%);
  -webkit-mask-image: radial-gradient(ellipse at center, #000 40%, transparent 85%);
}

:root[data-theme="dark"] .meteor-bg-image {
  opacity: 0.15;
  filter: brightness(0.8);
}

.meteor-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.meteor {
  position: absolute;
  width: 120px;
  height: 1px;
  border-radius: 999px;
  opacity: 0;
  background: linear-gradient(90deg, rgba(255,255,255,0), rgba(134,239,172,0.78), rgba(255,255,255,0.95));
  box-shadow: 0 0 12px rgba(134, 239, 172, 0.36);
  transform: rotate(-28deg);
  animation: meteor-fall 8s linear infinite;
}

.meteor-1 { top: 9%; left: 74%; animation-delay: .2s; animation-duration: 7.5s; }
.meteor-2 { top: 22%; left: 92%; animation-delay: 1.8s; animation-duration: 9s; width: 90px; }
.meteor-3 { top: 42%; left: 70%; animation-delay: 3.5s; animation-duration: 8.2s; width: 110px; }
.meteor-4 { top: 14%; left: 46%; animation-delay: 5.4s; animation-duration: 10s; width: 80px; }
.meteor-5 { top: 58%; left: 96%; animation-delay: 6.6s; animation-duration: 11s; width: 130px; }
.meteor-6 { top: 72%; left: 84%; animation-delay: 8.2s; animation-duration: 12s; width: 100px; }
.meteor-7 { top: 34%; left: 54%; animation-delay: 9.8s; animation-duration: 13s; width: 70px; }

@keyframes meteor-fall {
  0% {
    opacity: 0;
    transform: translate3d(0, 0, 0) rotate(-28deg);
  }
  8% { opacity: .72; }
  24% { opacity: .30; }
  42% {
    opacity: 0;
    transform: translate3d(-520px, 260px, 0) rotate(-28deg);
  }
  100% {
    opacity: 0;
    transform: translate3d(-520px, 260px, 0) rotate(-28deg);
  }
}

.page-hero {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: end;
  padding: 30px;
  border: 1px solid var(--tea-border);
  border-radius: 28px;
  background: linear-gradient(135deg, var(--tea-surface-soft), rgba(74, 222, 128, 0.08));
  box-shadow: var(--tea-shadow);
  backdrop-filter: blur(12px);
}

.hero-kicker {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 6px 14px;
  margin-bottom: 14px;
  color: var(--tea-primary);
  background: var(--tea-primary-soft);
  font-size: .86rem;
  font-weight: 800;
}

.hero-title {
  margin: 0 0 12px;
  color: var(--tea-primary);
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 900;
  letter-spacing: -.04em;
}

.hero-desc {
  max-width: 760px;
  margin: 0;
  color: var(--tea-text-muted);
  line-height: 1.9;
  font-size: 1.02rem;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(90px, 1fr));
  gap: 12px;
}

.hero-stat {
  min-width: 112px;
  padding: 14px 16px;
  border: 1px solid var(--tea-border);
  border-radius: 18px;
  background: var(--tea-surface);
  text-align: center;
  transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
}

.hero-stat.clickable {
  cursor: pointer;
}

.hero-stat.clickable:hover {
  transform: translateY(-3px);
  border-color: var(--tea-primary);
  box-shadow: 0 12px 24px rgba(0, 104, 59, 0.12);
}

.hero-stat strong {
  display: block;
  color: var(--tea-primary);
  font-size: 1.35rem;
  line-height: 1.1;
}

.hero-stat span {
  display: block;
  margin-top: 6px;
  color: var(--tea-text-muted);
  font-size: .82rem;
  white-space: nowrap;
}

:deep(.section-title-wrapper) {
  border-bottom-color: var(--tea-border) !important;
}

:deep(.card),
:deep(.service-card),
:deep(.ability-card),
:deep(.module-card),
:deep(.carbon-card) {
  color: var(--tea-text);
  background: var(--tea-surface-soft) !important;
  border-color: var(--tea-border) !important;
  box-shadow: var(--tea-shadow) !important;
}

:deep(.bg-light) {
  background: var(--tea-surface) !important;
}

@media (max-width: 992px) {
  .page-hero { grid-template-columns: 1fr; }
  .hero-stats { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 576px) {
  .page-hero { padding: 22px; }
  .hero-stats { grid-template-columns: 1fr; }
}
</style>
