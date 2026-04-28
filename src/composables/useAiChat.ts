import { ref } from 'vue'
import { matchFaqAnswer } from '@/utils/faq'

function apiUrl(path: string) {
  const base = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
  return `${base}${path}`
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export function useAiChat() {
  const messages = ref<ChatMessage[]>([])
  const history = ref<ChatMessage[]>([])
  const isLoading = ref(false)

  function pushHistory(role: 'user' | 'assistant', content: string) {
    if (!content) return
    history.value.push({ role, content })
    if (history.value.length > 30) {
      history.value.splice(0, history.value.length - 30)
    }
  }

  async function askQuestion(q: string) {
    if (!q.trim()) return
    messages.value.push({ role: 'user', content: q })
    pushHistory('user', q)
    isLoading.value = true

    try {
      const res = await fetch(apiUrl('/api/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: q,
          history: history.value.slice(-10),
        }),
      })
      const data = await res.json()
      const reply = (data?.reply || '').trim()
      if (reply) {
        messages.value.push({ role: 'assistant', content: reply })
        pushHistory('assistant', reply)
        return reply
      }
      throw new Error(data?.error || 'empty reply')
    } catch (e: any) {
      const fallback = matchFaqAnswer(q)
      const prefix = String(e?.message || '').includes('LLM_API_KEY')
        ? '我还没接入大模型（服务器未配置密钥），先按常见问题给你答：'
        : ''
      const text = prefix + fallback
      messages.value.push({ role: 'assistant', content: text })
      pushHistory('assistant', text)
      return text
    } finally {
      isLoading.value = false
    }
  }

  function clear() {
    messages.value = []
    history.value = []
  }

  return { messages, history, isLoading, askQuestion, clear }
}
