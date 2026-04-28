<template>
  <section id="tech" class="mb-5">
    <div class="section-title-wrapper">
      <h2 class="section-title">茶科技</h2>
      <a href="#" class="text-muted text-decoration-none">更多 <i class="fas fa-angle-right"></i></a>
    </div>
    <div class="row g-4">
      <div class="col-md-3 col-sm-6">
        <div class="service-card text-center">
          <div class="service-icon"><i class="fas fa-weight-hanging"></i></div>
          <h5 class="service-title">智能溯源秤</h5>
          <p class="service-desc">茶青收购、加工称重数字化。记录产地、品种、等级及茶农信息，实现源头可追溯。</p>
        </div>
      </div>
      <div class="col-md-3 col-sm-6">
        <div class="service-card text-center">
          <div class="service-icon"><i class="fas fa-qrcode"></i></div>
          <h5 class="service-title">茶标自助机</h5>
          <p class="service-desc">一物一码，扫码即查。为每一份安顶云雾茶生成唯一的数字身份证，保障品牌信誉。</p>
        </div>
      </div>
      <div class="col-md-3 col-sm-6">
        <div class="service-card text-center">
          <div class="service-icon"><i class="fas fa-microchip"></i></div>
          <h5 class="service-title">智能硬件集成</h5>
          <p class="service-desc">整合气象站、视频监控、水肥一体化设备，构建完整的茶园物联网生态系统。</p>
        </div>
      </div>
      <div class="col-md-3 col-sm-6">
        <div class="service-card text-center" @click="$emit('openMetaverse')" role="button" style="cursor:pointer">
          <div class="service-icon"><i class="fas fa-vr-cardboard"></i></div>
          <h5 class="service-title">茶园元宇宙</h5>
          <p class="service-desc">利用 VR/AR 技术，让消费者身临其境体验安顶山云雾缭绕的采茶场景，促进茶文旅融合。</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineEmits<{ openMetaverse: [] }>()
</script>

<style scoped>
.section-title-wrapper {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 10px;
}
.section-title {
  font-size: 1.8rem; font-weight: 700; color: var(--tea-primary);
  position: relative; padding-left: 15px;
}
.section-title::before {
  content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%);
  width: 5px; height: 25px; background-color: var(--tea-primary); border-radius: 2px;
}
.service-card {
  background: white; border-radius: 8px; padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.03); transition: all 0.3s;
  height: 100%; border: 1px solid #eee;
}
.service-card:hover {
  transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.08);
  border-color: var(--tea-primary);
}
.service-icon { font-size: 2rem; color: var(--tea-primary); margin-bottom: 15px; }
.service-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 10px; color: #333; }
.service-desc { font-size: 0.9rem; color: #777; line-height: 1.6; }
</style>
