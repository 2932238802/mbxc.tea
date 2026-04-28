<template>
  <section id="industry" class="mb-5">
    <div class="section-title-wrapper">
      <h2 class="section-title">茶产业</h2>
      <ul class="nav section-tabs">
        <li class="nav-item"><a class="nav-link active" href="#">数字茶园</a></li>
        <li class="nav-item"><a class="nav-link" href="#">未来茶场</a></li>
        <li class="nav-item"><router-link class="nav-link" to="/dashboard">茶产业大脑</router-link></li>
      </ul>
    </div>
    <div class="row g-4">
      <div class="col-md-6">
        <img src="/数字2.jpg" class="img-fluid rounded shadow-sm industry-img" alt="数字茶园">
      </div>
      <div class="col-md-6">
        <div class="h-100 d-flex flex-column justify-content-center">
          <h3 class="fw-bold mb-3 text-success">安顶山数字茶园示范基地</h3>
          <p class="text-muted mb-4">
            通过部署智能气象站、土壤墒情监测仪、虫情测报灯等物联网设备，实时采集茶园环境数据。结合遥感卫星影像，实现茶园长势监测、灾害预警和精准施肥灌溉。
          </p>
          <div class="row g-3">
            <div class="col-6"><div class="p-3 border rounded bg-light"><i class="fas fa-satellite-dish text-primary mb-2"></i><h6 class="fw-bold">全域感知</h6><small class="text-muted">空天地一体化监测体系</small></div></div>
            <div class="col-6"><div class="p-3 border rounded bg-light"><i class="fas fa-brain text-warning mb-2"></i><h6 class="fw-bold">智能决策</h6><small class="text-muted">AI 辅助农事管理建议</small></div></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

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
.section-tabs .nav-link {
  color: #666 !important; border: none; background: none; font-weight: 400; padding: 8px 12px;
}
.section-tabs .nav-link.active { color: var(--tea-primary) !important; font-weight: 700; }
.industry-img { width: 100%; max-height: 320px; object-fit: contain; }
</style>
