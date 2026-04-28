<template>
  <div class="sidebar d-none d-md-block">
    <div class="brand-logo">
      <img class="brand-logo-img" src="/logo.jpg" alt="Logo">
      <span>茗不虚传</span>
    </div>
    <div class="px-3 mb-3 text-muted" style="font-size:0.8rem;font-weight:600;">产业大脑中枢</div>
    <nav class="nav flex-column">
      <a class="nav-link active" href="#"><i class="fas fa-chart-pie"></i> 数据总览</a>
      <a class="nav-link" href="#"><i class="fas fa-seedling"></i> 数字茶园</a>
      <a class="nav-link" href="#"><i class="fas fa-chart-line"></i> 销售行情</a>
      <a class="nav-link" href="#"><i class="fas fa-industry"></i> 茶企 ERP</a>
      <a class="nav-link" href="#"><i class="fas fa-bullhorn"></i> 品牌服务</a>
      <a class="nav-link" href="#"><i class="fas fa-globe"></i> 茶碳汇管理</a>
      <a class="nav-link" href="#"><i class="fas fa-qrcode"></i> 智能溯源</a>
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  height: 100vh; position: sticky; top: 0; z-index: 100;
  background-color: rgba(255,255,255,0.94); box-shadow: 2px 0 10px rgba(0,0,0,0.05);
  backdrop-filter: blur(8px);
}
.brand-logo {
  color: var(--tea-green); font-weight: 800; font-size: 1.5rem;
  padding: 20px; text-align: center; border-bottom: 1px solid #f0f0f0;
  margin-bottom: 15px; display: flex; align-items: center; justify-content: center; gap: 10px;
}
.brand-logo-img { width: 36px; height: 36px; object-fit: contain; border-radius: 8px; }
.nav-item { margin: 4px 15px; }
.nav-link {
  color: #666; padding: 12px 20px; border-radius: 8px;
  transition: all 0.3s ease; display: flex; align-items: center; gap: 12px; font-weight: 500;
}
.nav-link:hover, .nav-link.active { background-color: #e8f5e9; color: var(--tea-green); }
.nav-link i { width: 20px; text-align: center; font-size: 1.1rem; }
</style>
