<template>
  <Layout>
    <section class="auth-page">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8 col-lg-5">
            <div class="auth-card">
              <div class="auth-header text-center mb-4">
                <span class="auth-badge">创建账号</span>
                <h1 class="fw-bold text-success mt-3 mb-2">注册</h1>
                <p class="text-muted mb-0">使用邮箱验证码完成账号注册</p>
              </div>

              <form @submit.prevent="handleSubmit" novalidate>
                <div class="mb-3">
                  <label class="form-label">邮箱</label>
                  <input
                    v-model.trim="form.email"
                    type="email"
                    class="form-control auth-input"
                    placeholder="请输入邮箱"
                    autocomplete="email"
                  >
                </div>

                <div class="mb-3">
                  <label class="form-label">邮箱验证码</label>
                  <div class="input-group code-group">
                    <input
                      v-model.trim="form.code"
                      class="form-control auth-input"
                      placeholder="请输入验证码"
                      inputmode="numeric"
                      autocomplete="one-time-code"
                    >
                    <button
                      type="button"
                      class="btn btn-outline-success code-btn"
                      :disabled="codeLoading || countdown > 0"
                      @click="sendCode"
                    >
                      <span v-if="codeLoading" class="spinner-border spinner-border-sm me-1"></span>
                      {{ codeButtonText }}
                    </button>
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">密码</label>
                  <div class="password-field">
                    <input
                      v-model="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control auth-input pe-5"
                      placeholder="至少 6 位密码"
                      autocomplete="new-password"
                    >
                    <button
                      type="button"
                      class="password-toggle"
                      :aria-label="showPassword ? '隐藏密码' : '显示密码'"
                      @click="showPassword = !showPassword"
                    >
                      <i :class="['fas', showPassword ? 'fa-eye-slash' : 'fa-eye']"></i>
                    </button>
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">再次输入密码</label>
                  <div class="password-field">
                    <input
                      v-model="form.confirmPassword"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      class="form-control auth-input pe-5"
                      placeholder="请再次输入密码"
                      autocomplete="new-password"
                    >
                    <button
                      type="button"
                      class="password-toggle"
                      :aria-label="showConfirmPassword ? '隐藏确认密码' : '显示确认密码'"
                      @click="showConfirmPassword = !showConfirmPassword"
                    >
                      <i :class="['fas', showConfirmPassword ? 'fa-eye-slash' : 'fa-eye']"></i>
                    </button>
                  </div>
                </div>

                <div v-if="success" class="alert alert-success py-2">
                  {{ success }}
                </div>

                <div v-if="error" class="alert alert-danger py-2">
                  {{ error }}
                </div>

                <button class="btn btn-success w-100 rounded-pill py-2" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ loading ? '注册中...' : '注册' }}
                </button>

                <div class="text-center mt-4">
                  <span class="text-muted">已有账号？</span>
                  <router-link to="/login" class="ms-1 text-success fw-bold text-decoration-none">
                    去登录
                  </router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '@/components/shop/LosLayout.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const codeLoading = ref(false)
const error = ref('')
const success = ref('')
const countdown = ref(0)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
let timer: number | undefined

const form = reactive({
  email: '',
  code: '',
  password: '',
  confirmPassword: '',
})

const codeButtonText = computed(() => {
  if (countdown.value > 0) return `${countdown.value}s 后重试`
  return '获取验证码'
})

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function startCountdown() {
  countdown.value = 60
  window.clearInterval(timer)
  timer = window.setInterval(() => {
    countdown.value -= 1
    if (countdown.value <= 0) {
      window.clearInterval(timer)
      timer = undefined
    }
  }, 1000)
}

async function sendCode() {
  error.value = ''
  success.value = ''

  if (!isValidEmail(form.email)) {
    error.value = '请输入正确的邮箱后再获取验证码'
    return
  }

  codeLoading.value = true

  try {
    await authStore.sendRegisterCode(form.email)
    success.value = '验证码已发送，请查看邮箱'
    startCountdown()
  } catch (e: any) {
    error.value = e?.message || '验证码发送失败'
  } finally {
    codeLoading.value = false
  }
}

async function handleSubmit() {
  error.value = ''
  success.value = ''

  if (!isValidEmail(form.email)) {
    error.value = '请输入正确的邮箱'
    return
  }

  if (!form.code) {
    error.value = '请输入邮箱验证码'
    return
  }

  if (form.password.length < 6) {
    error.value = '密码至少需要 6 位'
    return
  }

  if (form.password !== form.confirmPassword) {
    error.value = '两次输入的密码不一致'
    return
  }

  loading.value = true

  try {
    await authStore.register({
      email: form.email,
      password: form.password,
      code: form.code,
    })

    router.push('/')
  } catch (e: any) {
    error.value = e?.message || '注册失败，请稍后再试'
  } finally {
    loading.value = false
  }
}

onBeforeUnmount(() => {
  window.clearInterval(timer)
})
</script>

<style scoped>
.auth-page {
  min-height: 76vh;
  display: flex;
  align-items: center;
  padding: 56px 0;
  background:
    radial-gradient(circle at top left, var(--tea-primary-soft), transparent 34%),
    linear-gradient(135deg, var(--tea-page-bg) 0%, var(--tea-bg) 100%);
}

.auth-card {
  background: var(--tea-surface-soft);
  border: 1px solid var(--tea-border);
  border-radius: 24px;
  padding: 34px;
  box-shadow: var(--tea-shadow);
}

.auth-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 6px 14px;
  color: var(--tea-primary);
  background: var(--tea-primary-soft);
  font-size: 0.86rem;
  font-weight: 700;
}

.auth-input {
  min-height: 46px;
  border-radius: 14px;
}

.code-group .auth-input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.code-btn {
  min-width: 122px;
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
}

.password-field {
  position: relative;
}

.password-toggle {
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: var(--tea-text-muted);
  padding: 4px;
  line-height: 1;
}

.password-toggle:hover {
  color: var(--tea-primary);
}
</style>
