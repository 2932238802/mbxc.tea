import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { apiRequest } from '@/utils/api'

export interface AuthUser {
  id?: number
  email: string
  username?: string | null
  is_admin?: boolean
}

export interface AuthResponse {
  access_token: string
  token_type?: string
  user: AuthUser
}

export interface RegisterPayload {
  email: string
  password: string
  code: string
}

export interface LoginPayload {
  email: string
  password: string
}

const TOKEN_KEY = 'losteapy_token'
const USER_KEY = 'losteapy_user'

const AUTH_ENDPOINTS = {
  sendCode: '/api/auth/send-code',
  register: '/api/auth/register',
  login: '/api/auth/login',
  me: '/api/auth/me',
}

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function normalizeUser(user: AuthUser): AuthUser {
  return {
    ...user,
    email: user.email,
    username: user.username || user.email,
    is_admin: user.is_admin || user.email === 'Admin',
  }
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem(TOKEN_KEY) || '')
  const user = ref<AuthUser | null>(loadUser())
  const isLoggedIn = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() => !!user.value?.is_admin || user.value?.email === 'Admin')
  const displayName = computed(() => user.value?.username || user.value?.email || '')

  function saveSession(data: AuthResponse) {
    token.value = data.access_token
    user.value = normalizeUser(data.user)

    localStorage.setItem(TOKEN_KEY, data.access_token)
    localStorage.setItem(USER_KEY, JSON.stringify(user.value))
  }

  async function sendRegisterCode(email: string) {
    return apiRequest<{ message?: string }>(AUTH_ENDPOINTS.sendCode, {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  async function register(payload: RegisterPayload) {
    const data = await apiRequest<AuthResponse>(AUTH_ENDPOINTS.register, {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    saveSession(data)
    return data
  }

  async function login(payload: LoginPayload) {
    const isAdminLogin = payload.email === 'Admin' && payload.password === '666666'

    if (isAdminLogin && !import.meta.env.VITE_API_BASE_URL) {
      const data: AuthResponse = {
        access_token: `local-admin-${Date.now()}`,
        token_type: 'bearer',
        user: {
          id: 0,
          email: 'Admin',
          username: '系统管理员',
          is_admin: true,
        },
      }

      saveSession(data)
      return data
    }

    const data = await apiRequest<AuthResponse>(AUTH_ENDPOINTS.login, {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    saveSession(data)
    return data
  }

  async function fetchMe() {
    if (!token.value) return null

    try {
      const data = await apiRequest<AuthUser>(AUTH_ENDPOINTS.me, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })

      user.value = normalizeUser(data)
      localStorage.setItem(USER_KEY, JSON.stringify(user.value))
      return user.value
    } catch {
      logout()
      return null
    }
  }

  function authHeaders() {
    return token.value
      ? { Authorization: `Bearer ${token.value}` }
      : {}
  }

  function logout() {
    token.value = ''
    user.value = null

    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  return {
    token,
    user,
    isLoggedIn,
    isAdmin,
    displayName,
    sendRegisterCode,
    register,
    login,
    fetchMe,
    authHeaders,
    logout,
  }
})
