<template>
  <section id="culture" class="mb-5">
    <div class="section-title-wrapper">
      <h2 class="section-title">茶文旅 · 在线预约</h2>
      <span class="badge bg-success rounded-pill px-3 py-2">采茶 · 炒茶 · 研学</span>
    </div>
    <div class="row g-4">
      <div class="col-lg-7">
        <div class="card border-0 shadow-sm p-4 h-100">
          <h4 class="fw-bold mb-2"><i class="fas fa-mountain-sun text-success me-2"></i> 安顶山文旅体验</h4>
          <p class="text-muted mb-4">
            线上预约采茶、非遗炒茶与研学体验。提交后可在手机端完成支付预约金与短信确认，到景区凭预约码核销。
          </p>
          <div class="row g-3">
            <div class="col-md-4">
              <div class="p-3 border rounded bg-light h-100">
                <div class="fw-bold mb-1">采茶体验</div><small class="text-muted">深入核心茶园，亲手采摘</small>
              </div>
            </div>
            <div class="col-md-4">
              <div class="p-3 border rounded bg-light h-100">
                <div class="fw-bold mb-1">非遗炒茶</div><small class="text-muted">看技艺、学手法、带走成品</small>
              </div>
            </div>
            <div class="col-md-4">
              <div class="p-3 border rounded bg-light h-100">
                <div class="fw-bold mb-1">茶主题研学</div><small class="text-muted">亲子与团体研学课程</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="card border-0 shadow-sm p-4">
          <h5 class="fw-bold mb-3"><i class="fas fa-calendar-check text-success me-2"></i> 立即预约</h5>
          <form @submit.prevent="submitBooking" class="row g-3">
            <div class="col-12">
              <label class="form-label mb-1">体验项目</label>
              <select class="form-select" v-model="project" required>
                <option value="" disabled>请选择项目</option>
                <option>采茶</option>
                <option>炒茶</option>
                <option>研学</option>
              </select>
            </div>
            <div class="col-12">
              <label class="form-label mb-1">预约日期</label>
              <input type="date" class="form-control" v-model="date" required>
            </div>
            <div class="col-12">
              <label class="form-label mb-1">人数</label>
              <input type="number" min="1" max="99" class="form-control" v-model="people" placeholder="请输入人数" required>
            </div>
            <div class="col-12 d-grid">
              <button type="submit" class="btn btn-success rounded-pill"><i
                  class="fas fa-paper-plane me-2"></i>提交预约</button>
            </div>
            <div class="col-12 d-grid" v-if="booked">
              <button type="button" class="btn btn-outline-danger rounded-pill" @click="cancelBooking"><i
                  class="fas fa-xmark me-2"></i>取消预约</button>
            </div>
            <div class="col-12" v-if="result">
              <div class="text-success fw-semibold">{{ result }}</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const project = ref('')
const date = ref('')
const people = ref('')
const result = ref('')
const booked = ref(false)

function submitBooking() {
  if (!project.value || !date.value || !people.value) return
  result.value = `已提交预约：${project.value} · ${date.value} · ${people.value}人。请继续完成预约金支付以锁定名额。`
  booked.value = true
}

function cancelBooking() {
  project.value = ''; date.value = ''; people.value = ''
  result.value = ''; booked.value = false
}
</script>

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
</style>
