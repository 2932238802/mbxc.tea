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
            <div v-for="(msg, i) in messages" :key="i" class="ai-bubble" :class="msg.role">
              {{ msg.content }}
            </div>
            <div v-if="isLoading" class="ai-bubble bot">茶小泽正在输入…</div>
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
  background: rgba(248, 249, 250, 0.8);
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 12px;
  max-height: 36vh;
  overflow: auto;
}

.ai-bubble {
  border-radius: 12px;
  padding: 10px 12px;
  margin-bottom: 10px;
  line-height: 1.6;
  font-size: 0.95rem;
}

.ai-bubble.user {
  background: rgba(0, 104, 59, 0.10);
  border: 1px solid rgba(0, 104, 59, 0.18);
}

.ai-bubble.bot {
  background: #fff;
  border: 1px solid #eee;
}
</style>
