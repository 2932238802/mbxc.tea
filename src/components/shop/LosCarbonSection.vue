<template>
  <section id="carbon" class="carbon-section">
    <div class="container">
      <div class="section-title-wrapper border-bottom-0">
        <h2 class="section-title">茶碳汇</h2>
        <span class="badge bg-success rounded-pill px-3 py-2">绿水青山就是金山银山</span>
      </div>
      <div class="row align-items-center">
        <div class="col-md-5">
          <div class="card border-0 shadow-sm p-4">
            <h4 class="fw-bold mb-3"><i class="fas fa-tree text-success me-2"></i> 茶园碳汇价值</h4>
            <p class="text-muted mb-4">农业是重要的温室气体排放源之一，同时也有巨大的碳汇能力茶园具有很高的植被覆盖率，茶树树冠覆盖面积大，固碳能力强</p>
            <div class="mb-3">
              <div class="carbon-tag"><i class="fas fa-check-circle me-1"></i> 政府承诺: 2030碳达峰 / 2060碳中和</div>
              <div class="carbon-tag"><i class="fas fa-check-circle me-1"></i> 产业优势: 产业链最长、数字化基础好</div>
              <div class="carbon-tag"><i class="fas fa-check-circle me-1"></i> 社会价值: 促进新旧动能转换</div>
            </div>
            <a href="#" class="btn btn-success rounded-pill mt-2">查看碳汇交易案例</a>
          </div>
        </div>
        <div class="col-md-7 text-center">
          <img src="/碳汇.jpg" class="img-fluid rounded shadow" alt="碳汇">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.carbon-section { background-color: var(--tea-light); padding: 60px 0; }
.section-title-wrapper {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 30px; padding-bottom: 10px;
}
.section-title {
  font-size: 1.8rem; font-weight: 700; color: var(--tea-primary);
  position: relative; padding-left: 15px;
}
.section-title::before {
  content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%);
  width: 5px; height: 25px; background-color: var(--tea-primary); border-radius: 2px;
}
.carbon-tag {
  display: inline-block; background: rgba(0, 104, 59, 0.1); color: var(--tea-primary);
  padding: 5px 12px; border-radius: 15px; font-size: 0.85rem;
  margin-bottom: 10px; font-weight: 600;
}
</style>
