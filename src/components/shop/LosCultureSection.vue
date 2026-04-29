<template>
  <section id="culture" class="culture-section mb-5">
    <div class="section-title-wrapper">
      <div>
        <h2 class="section-title">茶文旅 · 在线预约</h2>
        <p class="section-subtitle mb-0">选择体验项目，提交预约后我们将协助确认行程</p>
      </div>
      <span class="badge bg-success rounded-pill px-3 py-2">采茶 · 炒茶 · 研学</span>
    </div>

    <div class="row g-4 align-items-stretch">
      <div class="col-lg-7">
        <div class="culture-card p-4 h-100">
          <div class="d-flex align-items-start justify-content-between gap-3 mb-3">
            <div>
              <h4 class="fw-bold mb-2"><i class="fas fa-mountain-sun text-success me-2"></i> 安顶山文旅体验</h4>
              <p class="text-muted mb-0">
                线上预约采茶、非遗炒茶与研学体验提交后可完成预约确认，到景区凭预约信息核销
              </p>
            </div>
            <div class="weather-chip">
              <i class="fas fa-cloud-sun"></i>
              <span>适合亲子 / 团建</span>
            </div>
          </div>

          <div class="experience-grid mb-4">
            <button
              v-for="item in experiences"
              :key="item.name"
              type="button"
              class="experience-card"
              :class="{ active: project === item.name }"
              @click="selectProject(item.name)"
            >
              <span class="experience-icon">
                <span class="visual-mark">{{ visualIcon(item.visual) }}</span>
              </span>
              <strong>{{ item.name }}</strong>
              <small>{{ item.desc }}</small>
            </button>
          </div>

          <div class="route-panel mb-4">
            <div class="route-line">
              <span>到达游客中心</span>
              <i class="fas fa-chevron-right"></i>
              <span>茶园体验</span>
              <i class="fas fa-chevron-right"></i>
              <span>非遗工坊</span>
              <i class="fas fa-chevron-right"></i>
              <span>茶礼带回</span>
            </div>
          </div>

          <div class="row g-3">
            <div class="col-md-4" v-for="feature in features" :key="feature.title">
              <div class="feature-card h-100">
                <div class="feature-icon"><span class="visual-mark">{{ visualIcon(feature.visual) }}</span></div>
                <div class="fw-bold mb-1">{{ feature.title }}</div>
                <small class="text-muted">{{ feature.desc }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-5">
        <div class="culture-card booking-card p-4 h-100">
          <h5 class="fw-bold mb-3"><i class="fas fa-calendar-check text-success me-2"></i> 立即预约</h5>
          <form @submit.prevent="submitBooking" class="row g-3">
            <div class="col-12">
              <label class="form-label mb-1">体验项目</label>
              <select class="form-select" v-model="project" required>
                <option value="" disabled>请选择项目</option>
                <option v-for="item in experiences" :key="item.name">{{ item.name }}</option>
              </select>
            </div>
            <div class="col-12">
              <label class="form-label mb-1">预约日期</label>
              <input type="date" class="form-control" v-model="date" :min="today" required>
            </div>
            <div class="col-12">
              <label class="form-label mb-1">人数</label>
              <input type="number" min="1" max="99" class="form-control" v-model="people" placeholder="请输入人数" required>
            </div>
            <div class="col-12">
              <label class="form-label mb-1">联系方式</label>
              <input type="tel" class="form-control" v-model="phone" placeholder="用于接收预约确认">
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
              <div class="booking-result">{{ result }}</div>
            </div>
          </form>

          <div class="booking-tips mt-4">
            <div class="tip-item"><i class="fas fa-clock"></i> 建议提前 1 天预约</div>
            <div class="tip-item"><i class="fas fa-user-group"></i> 亲子、团队均可安排</div>
            <div class="tip-item"><i class="fas fa-leaf"></i> 体验内容会随季节调整</div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4 mt-1">
      <div class="col-md-4" v-for="step in steps" :key="step.title">
        <div class="process-card h-100">
          <div class="process-index">{{ step.no }}</div>
          <h5>{{ step.title }}</h5>
          <p>{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { visualIcon, type VisualKey } from '@/utils/visual'

const project = ref('')
const date = ref('')
const people = ref('')
const phone = ref('')
const result = ref('')
const booked = ref(false)
const today = new Date().toISOString().slice(0, 10)

const experiences: Array<{ name: string; visual: VisualKey; desc: string }> = [
  { name: '采茶体验', visual: 'leaf', desc: '深入核心茶园，亲手采摘春茶鲜叶' },
  { name: '非遗炒茶', visual: 'fire', desc: '观看手工炒制，体验传统制茶技艺' },
  { name: '茶主题研学', visual: 'study', desc: '适合亲子课堂、学校与团队研学' },
]

const features: Array<{ title: string; visual: VisualKey; desc: string }> = [
  { title: '茶园导览', visual: 'route', desc: '了解安顶山云雾环境与茶园生态' },
  { title: '制茶工坊', visual: 'cup', desc: '从鲜叶到茶香，体验完整制茶流程' },
  { title: '伴手茶礼', visual: 'gift', desc: '可选购茶礼，把山野茶香带回家' },
]

const steps = [
  { no: '01', title: '选择项目', desc: '根据出游人群选择采茶、炒茶或茶主题研学' },
  { no: '02', title: '提交预约', desc: '填写日期、人数与联系方式，工作人员将协助确认' },
  { no: '03', title: '到场体验', desc: '按预约时间到达，凭预约信息核销并开始茶旅' },
]

function selectProject(name: string) {
  project.value = name
}

function submitBooking() {
  if (!project.value || !date.value || !people.value) return

  if (date.value < today) {
    result.value = '预约日期不能早于今天，请重新选择日期'
    booked.value = false
    return
  }

  result.value = `已提交预约：${project.value} · ${date.value} · ${people.value}人，我们将尽快确认行程`
  booked.value = true
}

function cancelBooking() {
  project.value = ''; date.value = ''; people.value = ''; phone.value = ''
  result.value = ''; booked.value = false
}
</script>

<style scoped>
.culture-section {
  position: relative;
  z-index: 1;
}

.section-title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  margin-bottom: 22px;
  border-bottom: 1px solid var(--tea-border);
  padding-bottom: 14px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--tea-primary);
  position: relative;
  padding-left: 15px;
  margin-bottom: 4px;
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

.section-subtitle {
  color: var(--tea-text-muted);
  padding-left: 15px;
}

.culture-card {
  border: 1px solid var(--tea-border);
  border-radius: 22px;
  color: var(--tea-text);
  background: var(--tea-surface-soft);
  box-shadow: var(--tea-shadow);
  backdrop-filter: blur(12px);
}

.weather-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  padding: 8px 12px;
  border-radius: 999px;
  color: var(--tea-primary);
  background: var(--tea-primary-soft);
  font-size: .82rem;
  font-weight: 800;
  white-space: nowrap;
}

.experience-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.experience-card {
  min-height: 132px;
  border: 1px solid var(--tea-border);
  border-radius: 18px;
  padding: 16px;
  color: var(--tea-text);
  background: var(--tea-surface);
  text-align: left;
  transition: transform .2s ease, border-color .2s ease, background-color .2s ease;
}

.experience-card:hover,
.experience-card.active {
  transform: translateY(-3px);
  border-color: var(--tea-primary);
  background: var(--tea-primary-soft);
}

.experience-icon {
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  border-radius: 14px;
  color: var(--tea-primary);
  background: var(--tea-primary-soft);
}

.visual-mark {
  font-size: 1.18rem;
  line-height: 1;
  font-weight: 900;
}

.experience-card strong,
.experience-card small {
  display: block;
}

.experience-card small {
  margin-top: 6px;
  color: var(--tea-text-muted);
  line-height: 1.6;
}

.route-panel {
  overflow: auto;
  padding: 14px;
  border-radius: 18px;
  border: 1px solid var(--tea-border);
  background: linear-gradient(90deg, var(--tea-primary-soft), transparent);
}

.route-line {
  min-width: 620px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--tea-text-muted);
  font-weight: 700;
}

.route-line span {
  color: var(--tea-text);
}

.route-line i {
  color: var(--tea-primary);
}

.feature-card,
.process-card {
  height: 100%;
  border: 1px solid var(--tea-border);
  border-radius: 18px;
  padding: 18px;
  color: var(--tea-text);
  background: var(--tea-surface);
}

.feature-icon {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  border-radius: 12px;
  color: var(--tea-primary);
  background: var(--tea-primary-soft);
}

.booking-card {
  position: sticky;
  top: 96px;
}

.booking-result {
  padding: 12px 14px;
  border-radius: 14px;
  color: var(--tea-primary);
  background: var(--tea-primary-soft);
  font-weight: 800;
  line-height: 1.7;
}

.booking-tips {
  display: grid;
  gap: 10px;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 14px;
  color: var(--tea-text-muted);
  background: var(--tea-surface);
  border: 1px solid var(--tea-border);
}

.tip-item i {
  color: var(--tea-primary);
}

.process-card {
  position: relative;
  overflow: hidden;
}

.process-card::after {
  content: '';
  position: absolute;
  right: -30px;
  bottom: -30px;
  width: 100px;
  height: 100px;
  border-radius: 999px;
  background: var(--tea-primary-soft);
}

.process-index {
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  border-radius: 14px;
  color: var(--tea-primary);
  background: var(--tea-primary-soft);
  font-weight: 900;
}

.process-card h5 {
  position: relative;
  z-index: 1;
  color: var(--tea-text);
  font-weight: 800;
}

.process-card p {
  position: relative;
  z-index: 1;
  color: var(--tea-text-muted);
  line-height: 1.8;
  margin-bottom: 0;
}

@media (max-width: 992px) {
  .experience-grid {
    grid-template-columns: 1fr;
  }

  .booking-card {
    position: static;
  }
}

@media (max-width: 576px) {
  .section-title-wrapper {
    align-items: flex-start;
    flex-direction: column;
  }

  .weather-chip {
    display: none;
  }
}
</style>
