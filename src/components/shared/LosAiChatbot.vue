<template>
  <Teleport to="body">
    <div v-if="visible" class="overlay-page is-open">
      <div class="overlay-header">
        <div class="overlay-title">
          <img :src="assetUrl('茶小泽2.png')" alt="茶小泽" class="bot-avatar">
          <div class="overlay-title-stack">
            <div>茶小泽 · AI 客服</div>
            <div class="overlay-title-sub">Hi～我是茶小泽，关于安顶山茶产业的任何问题，尽管问我噢！</div>
          </div>
        </div>
        <button class="btn btn-sm btn-outline-secondary rounded-pill px-3" @click="$emit('close')">
          <i class="fas fa-times me-1"></i>关闭
        </button>
      </div>

      <div class="overlay-body">
        <div class="overlay-container">
          <div class="accordion mb-3" id="faqAccordion">
            <div class="accordion-item" v-for="(faq, i) in faqList" :key="i">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  :data-bs-target="`#faq-c${i}`">
                  {{ faq.q }}
                </button>
              </h2>
              <div :id="`faq-c${i}`" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                  {{ faq.a }}
                  <div class="mt-3" v-if="faq.mapSrc">
                    <button class="btn btn-sm btn-outline-success rounded-pill"
                      @click="$emit('showImage', faq.mapSrc, faq.mapTitle)">
                      <i class="fas fa-map-marked-alt me-1"></i>查看导览图
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex flex-wrap gap-2 mb-2">
            <button v-for="btn in quickBtns" :key="btn.label" class="btn btn-sm btn-outline-success rounded-pill"
              @click="handleQuick(btn.q)">
              {{ btn.label }}
            </button>
          </div>

          <div class="ai-chat-log mb-3" ref="chatRef">
            <div v-for="(msg, i) in messages" :key="i" class="ai-message-row" :class="msg.role">
              <img v-if="msg.role === 'assistant'" :src="assetUrl('茶小泽2.png')" alt="茶小泽" class="message-avatar">
              <div class="ai-bubble" :class="msg.role === 'assistant' ? 'bot' : 'user'" v-html="formatMessage(msg.content)"></div>
            </div>
            <div v-if="isLoading" class="ai-message-row bot">
              <img :src="assetUrl('茶小泽2.png')" alt="茶小泽" class="message-avatar">
              <div class="ai-bubble bot typing-bubble">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <em>茶小泽正在思考</em>
              </div>
            </div>
          </div>

          <!-- Input -->
          <div class="input-group">
            <input v-model="text" class="form-control" placeholder="请输入你的问题..." @keydown.enter="send"
              :disabled="isLoading">
            <button class="btn btn-success" @click="send" :disabled="isLoading">发送</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<!--------------------------------------------------------->

<script setup lang="ts">
import { assetUrl } from '@/utils/asset'
import { ref, watch, nextTick } from 'vue'
import { useAiChat } from '@/composables/useAiChat'
import { FAQ_LIST, QUICK_BTNS } from '@/utils/faq'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits<{
  close: []
  showImage: [src: string, title: string]
}>()

const faqList = FAQ_LIST
const quickBtns = QUICK_BTNS
const { messages, isLoading, askQuestion } = useAiChat()
const text = ref('')
const chatRef = ref<HTMLElement>()

watch(() => props.visible, (v) => {
  if (v) document.body.style.overflow = 'hidden'
  else document.body.style.overflow = ''
})

async function send() {
  const q = text.value.trim()
  if (!q) return
  text.value = ''
  await askQuestion(q)
  await nextTick()
  chatRef.value?.scrollTo({ top: chatRef.value.scrollHeight, behavior: 'smooth' })
}

function handleQuick(q: string) {
  text.value = q
  send()
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatMessage(content: string) {
  let html = escapeHtml(content)

  html = html
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>')
    .replace(/\s*(\d+)\.\s*/g, '<br><span class="answer-index">$1</span> ')
    .replace(/\s*[-•]\s*/g, '<br><span class="answer-dot"></span> ')

  html = html.replace(/^<br>/, '')
  return html
}
</script>

<!--------------------------------------------------------->

<style scoped>
.overlay-page {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(247, 252, 249, 0.95);
  backdrop-filter: blur(10px);
}

.overlay-header {
  position: sticky;
  top: 0;
  z-index: 1;
  background: rgba(255, 255, 255, 0.86);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.overlay-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  color: var(--tea-primary);
}

.bot-avatar {
  width: 34px;
  height: 34px;
  object-fit: contain;
  border-radius: 10px;
}

.overlay-title-stack {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.overlay-title-sub {
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.58);
}

.overlay-body {
  height: calc(100vh - 58px);
  overflow: auto;
  padding: 18px 16px 26px;
}

.overlay-container {
  max-width: 1080px;
  margin: 0 auto;
}

.ai-chat-log {
  background: linear-gradient(180deg, rgba(248, 252, 250, 0.88), rgba(255, 255, 255, 0.78));
  border: 1px solid var(--tea-border);
  border-radius: 18px;
  padding: 16px;
  max-height: 42vh;
  overflow: auto;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.72);
}

.ai-message-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
}

.ai-message-row.user {
  justify-content: flex-end;
}

.message-avatar {
  width: 34px;
  height: 34px;
  object-fit: contain;
  border-radius: 12px;
  background: #fff;
  border: 1px solid var(--tea-border);
  box-shadow: 0 6px 16px rgba(0, 104, 59, 0.10);
}

.ai-bubble {
  max-width: min(820px, 88%);
  border-radius: 18px;
  padding: 13px 15px;
  line-height: 1.85;
  font-size: 0.95rem;
  word-break: break-word;
  white-space: normal;
}

.ai-bubble.user {
  color: #0f3b25;
  background: linear-gradient(135deg, rgba(0, 104, 59, 0.12), rgba(18, 183, 106, 0.08));
  border: 1px solid rgba(0, 104, 59, 0.18);
  border-top-right-radius: 6px;
}

.ai-bubble.bot {
  color: var(--tea-text);
  background: #fff;
  border: 1px solid rgba(0, 104, 59, 0.10);
  border-top-left-radius: 6px;
  box-shadow: 0 10px 26px rgba(0, 104, 59, 0.08);
}

:deep(.ai-bubble strong) {
  color: var(--tea-primary);
  font-weight: 900;
}

:deep(.ai-bubble code) {
  padding: 2px 6px;
  border-radius: 7px;
  color: var(--tea-primary);
  background: var(--tea-primary-soft);
  font-family: inherit;
  font-weight: 800;
}

:deep(.answer-index) {
  min-width: 22px;
  height: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 8px 6px 2px 0;
  border-radius: 999px;
  color: #fff;
  background: var(--tea-primary);
  font-size: .78rem;
  font-weight: 900;
}

:deep(.answer-dot) {
  width: 8px;
  height: 8px;
  display: inline-block;
  margin: 0 8px 1px 2px;
  border-radius: 999px;
  background: var(--tea-primary);
}

.typing-bubble {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.typing-bubble em {
  margin-left: 4px;
  color: var(--tea-text-muted);
  font-style: normal;
}

.typing-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--tea-primary);
  animation: typing-bounce 1s infinite ease-in-out;
}

.typing-dot:nth-child(2) { animation-delay: .15s; }
.typing-dot:nth-child(3) { animation-delay: .3s; }

@keyframes typing-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: .45; }
  40% { transform: translateY(-4px); opacity: 1; }
}
</style>
