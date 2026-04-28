<template>
  <section id="service" class="mb-5">
    <div class="section-title-wrapper">
      <h2 class="section-title">茶服务</h2>
      <ul class="nav section-tabs">
        <li class="nav-item"><a class="nav-link active" href="#">品牌服务</a></li>
        <li class="nav-item"><a class="nav-link" href="#">茶金融</a></li>
        <li class="nav-item"><a class="nav-link" href="#">市场调研</a></li>
      </ul>
    </div>
    <div class="row g-4">
      <div class="col-md-4">
        <div class="service-card">
          <h5 class="service-title border-bottom pb-2 mb-3"><i class="fas fa-poll text-info me-2"></i> 市场与消费者调研</h5>
          <p class="service-desc mb-3">采集茶企相关信息，从宏观层面给予茶产业发展趋势观点深入了解品牌的知晓度、美誉度，洞悉茶企品牌机会</p>
          <a href="#" class="btn btn-sm btn-outline-secondary rounded-pill">了解详情</a>
        </div>
      </div>
      <div class="col-md-4">
        <div class="service-card">
          <h5 class="service-title border-bottom pb-2 mb-3"><i class="fas fa-bullhorn text-danger me-2"></i> 品牌定位与营销
          </h5>
          <p class="service-desc mb-3">基于品牌发展愿景，制定核心价值表达策划品牌发布会、推介会，对接线上线下渠道，扩大品牌影响力</p>
          <a href="#" class="btn btn-sm btn-outline-secondary rounded-pill">了解详情</a>
        </div>
      </div>
      <div class="col-md-4">
        <div class="service-card">
          <h5 class="service-title border-bottom pb-2 mb-3"><i class="fas fa-file-invoice-dollar text-success me-2"></i>
            供应链金融服务</h5>
          <p class="service-desc mb-3">基于真实的交易数据和库存数据，为茶企提供"茶园贷"、"订单贷"等普惠金融服务，解决融资难题</p>
          <a href="#" class="btn btn-sm btn-outline-secondary rounded-pill">了解详情</a>
        </div>
      </div>
    </div>
  </section>
</template>













<style scoped>
.section-title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--tea-primary);
  position: relative;
  padding-left: 15px;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 25px;
  background-color: var(--tea-primary);
  border-radius: 2px;
}

.section-tabs .nav-link {
  color: #666 !important;
  border: none;
  background: none;
  font-weight: 400;
  padding: 8px 12px;
}

.section-tabs .nav-link.active {
  color: var(--tea-primary) !important;
  font-weight: 700;
}

.service-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  transition: all 0.3s;
  height: 100%;
  border: 1px solid #eee;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  border-color: var(--tea-primary);
}

.service-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
}

.service-desc {
  font-size: 0.9rem;
  color: #777;
  line-height: 1.6;
}
</style>
