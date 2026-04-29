<template>
  <Layout>
    <section class="auth-page">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8 col-lg-5">
            <div class="auth-card">
              <div class="auth-header text-center mb-4">
                <span class="auth-badge">欢迎回来</span>
                <h1 class="fw-bold text-success mt-3 mb-2">登录</h1>
                <p class="text-muted mb-0">使用邮箱和密码登录茗不虚传平台</p>
              </div>

              <form @submit.prevent="handleSubmit" novalidate>
                <div class="mb-3">
                  <label class="form-label">邮箱</label>
                  <input
                    v-model.trim="form.email"
                    type="text"
                    class="form-control auth-input"
                    placeholder="请输入邮箱 / 管理员账号"
                    autocomplete="username"
                  >
                </div>

                <div class="mb-3">
                  <label class="form-label">密码</label>
                  <div class="password-field">
                    <input
                      v-model="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control auth-input pe-5"
                      placeholder="请输入密码"
                      autocomplete="current-password"
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

                <div v-if="error" class="alert alert-danger py-2">
                  {{ error }}
                </div>

                <button class="btn btn-success w-100 rounded-pill py-2" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ loading ? '登录中...' : '登录' }}
                </button>

                <div class="text-center mt-4">
                  <span class="text-muted">还没有账号？</span>
                  <router-link to="/register" class="ms-1 text-success fw-bold text-decoration-none">
                    去注册
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
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Layout from '@/components/shop/LosLayout.vue'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')
const showPassword = ref(false)

const form = reactive({
  email: '',
  password: '',
})

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function handleSubmit() {
  error.value = ''

  if (form.email !== 'Admin' && !isValidEmail(form.email)) {
    error.value = '请输入正确的邮箱或管理员账号'
    return
  }

  if (!form.password) {
    error.value = '请输入密码'
    return
  }

  loading.value = true

  try {
    await authStore.login({
      email: form.email,
      password: form.password,
    })

    const redirect = typeof route.query.redirect === 'string'
      ? route.query.redirect
      : '/'

    router.push(redirect)
  } catch (e: any) {
    error.value = e?.message || '登录失败，请稍后再试'
  } finally {
    loading.value = false
  }
}
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
