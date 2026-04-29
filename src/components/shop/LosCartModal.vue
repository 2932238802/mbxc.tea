<template>
  <!-- 未登录提示弹窗 -->
  <Teleport to="body">
    <div v-if="loginModal.show" class="modal fade show d-block los-modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content los-modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">登录后再继续</h5>
            <button type="button" class="btn-close" @click="loginModal.show = false"></button>
          </div>
          <div class="modal-body">
            <div class="text-muted">{{ loginModal.message }}</div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-secondary rounded-pill px-4" @click="loginModal.show = false">
              稍后再说
            </button>
            <button class="btn btn-success rounded-pill px-4" @click="goLogin">
              去登录
            </button>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show los-modal-backdrop" @click="loginModal.show = false"></div>
    </div>
  </Teleport>

  <!-- 全局购物车弹窗 -->
  <Teleport to="body">
    <div v-if="cartModal.show" class="modal fade show d-block los-modal" tabindex="-1">
      <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content los-modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">购物车</h5>
            <button type="button" class="btn-close" @click="cartModal.show = false"></button>
          </div>
          <div class="modal-body">
            <div class="row g-4">
              <div class="col-lg-7">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <div class="fw-bold">已选商品</div>
                  <button
                    class="btn btn-sm btn-outline-danger rounded-pill"
                    :disabled="!cart.items.length"
                    @click="cart.clear()"
                  >
                    清空
                  </button>
                </div>

                <div v-if="!cart.items.length" class="empty-cart">
                  购物车还是空的，去挑点茶品或文创周边吧
                </div>

                <div v-for="(item, i) in cart.items" :key="`${item.name}-${i}`" class="cart-item">
                  <div class="d-flex justify-content-between align-items-start gap-3">
                    <div>
                      <div class="fw-bold">{{ item.name }}</div>
                      <div class="text-muted small">单价 ¥{{ item.price }}</div>
                    </div>
                    <button class="btn btn-sm btn-outline-danger rounded-pill" @click="cart.remove(i)">
                      删除
                    </button>
                  </div>

                  <div class="d-flex justify-content-between align-items-center mt-2">
                    <div class="input-group qty-stepper" style="max-width:220px">
                      <button class="btn btn-outline-secondary" @click="cart.updateQty(i, item.qty - 1)">-</button>
                      <input
                        class="form-control text-center fw-bold"
                        :value="item.qty"
                        @blur="cart.updateQty(i, Number(($event.target as HTMLInputElement).value))"
                      >
                      <button class="btn btn-outline-secondary" @click="cart.updateQty(i, item.qty + 1)">+</button>
                    </div>
                    <div class="fw-bold">小计<span class="text-success ms-2">¥{{ item.price * item.qty }}</span></div>
                  </div>
                </div>

                <div class="d-flex justify-content-end mt-3">
                  <div class="fw-bold">合计<span class="text-success ms-2">¥{{ cart.totalPrice }}</span></div>
                </div>
              </div>

              <div class="col-lg-5">
                <div class="fw-bold mb-2">结算信息</div>
                <div class="row g-3">
                  <div class="col-12">
                    <label class="form-label mb-1">收货人</label>
                    <input class="form-control" v-model="checkout.name" placeholder="请输入收货人姓名">
                  </div>
                  <div class="col-12">
                    <label class="form-label mb-1">电话</label>
                    <input class="form-control" v-model="checkout.phone" placeholder="请输入手机号">
                  </div>
                  <div class="col-12">
                    <label class="form-label mb-1">地址</label>
                    <input class="form-control" v-model="checkout.addr" placeholder="请输入详细地址">
                  </div>
                  <div class="col-12">
                    <label class="form-label mb-1">备注</label>
                    <textarea
                      class="form-control"
                      v-model="checkout.note"
                      rows="3"
                      placeholder="可填写发货批次偏好、是否礼盒等"
                    ></textarea>
                  </div>

                  <div v-if="submitError" class="col-12">
                    <div class="alert alert-danger py-2 mb-0">{{ submitError }}</div>
                  </div>

                  <div class="col-12 d-grid">
                    <button
                      class="btn btn-success rounded-pill"
                      :disabled="submitting || !cart.items.length"
                      @click="submitOrder"
                    >
                      <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
                      {{ submitting ? '提交中…' : '提交订单' }}
                    </button>
                  </div>

                  <div class="col-12">
                    <div class="text-muted small">提交订单后，平台客服会与您确认发货批次与支付方式</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show los-modal-backdrop" @click="cartModal.show = false"></div>
    </div>
  </Teleport>

  <!-- 订单提交成功弹窗 -->
  <Teleport to="body">
    <div v-if="orderSuccessModal.show" class="modal fade show d-block los-modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content success-modal los-modal-content">
          <div class="modal-body text-center py-4">
            <div class="success-icon">✓</div>
            <h5 class="fw-bold mt-3 mb-1">订单已提交</h5>
            <div class="text-muted small">订单号 #{{ orderSuccessModal.orderId }}，合计 ¥{{ orderSuccessModal.total }}</div>
            <div class="text-muted small mt-2">平台客服将尽快与您联系确认</div>
          </div>
          <div class="modal-footer justify-content-center border-0 pt-0">
            <button class="btn btn-success rounded-pill px-4" @click="orderSuccessModal.show = false">好的</button>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show los-modal-backdrop" @click="orderSuccessModal.show = false"></div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { createOrder } from '@/utils/orders'

const cart = useCartStore()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const cartModal = reactive({ show: false })
const loginModal = reactive({ show: false, message: '登录后即可查看和结算购物车' })
const checkout = reactive({ name: '', phone: '', addr: '', note: '' })
const submitting = ref(false)
const submitError = ref('')
const orderSuccessModal = reactive({ show: false, orderId: 0, total: 0 })

function openCart() {
  submitError.value = ''

  if (!authStore.isLoggedIn) {
    loginModal.message = '登录后即可查看和结算购物车'
    loginModal.show = true
    return
  }

  cartModal.show = true
}

function goLogin() {
  loginModal.show = false
  router.push({ path: '/login', query: { redirect: route.fullPath || '/' } })
}

async function submitOrder() {
  submitError.value = ''

  if (!cart.items.length) {
    submitError.value = '购物车为空，无法提交订单'
    return
  }

  if (!checkout.name.trim()) {
    submitError.value = '请填写收货人姓名'
    return
  }

  if (!checkout.phone.trim()) {
    submitError.value = '请填写联系电话'
    return
  }

  if (!checkout.addr.trim()) {
    submitError.value = '请填写收货地址'
    return
  }

  submitting.value = true

  try {
    const order = await createOrder(
      {
        contact_name: checkout.name.trim(),
        contact_phone: checkout.phone.trim(),
        contact_address: checkout.addr.trim(),
        note: checkout.note.trim() || null,
        items: cart.snapshot(),
      },
      authStore.token || undefined,
    )

    orderSuccessModal.orderId = order.id
    orderSuccessModal.total = order.total_price
    orderSuccessModal.show = true

    cart.clear()
    cartModal.show = false
    checkout.name = ''
    checkout.phone = ''
    checkout.addr = ''
    checkout.note = ''
  } catch (e: any) {
    submitError.value = e?.message || '订单提交失败，请稍后再试'
  } finally {
    submitting.value = false
  }
}

onMounted(() => window.addEventListener('open-cart', openCart))
onUnmounted(() => window.removeEventListener('open-cart', openCart))
</script>

<style scoped>
.cart-item {
  padding: 14px;
  border-radius: 14px;
  margin-bottom: 10px;
  border: 1px solid var(--tea-border);
  background: var(--tea-surface);
}

.empty-cart {
  padding: 28px 16px;
  border-radius: 14px;
  text-align: center;
  color: var(--tea-text-muted);
  background: var(--tea-surface);
  border: 1px dashed var(--tea-border);
}

.success-modal {
  border-radius: 20px;
  border: 1px solid var(--tea-border);
  background: var(--tea-surface);
}

.success-icon {
  width: 64px;
  height: 64px;
  line-height: 64px;
  margin: 0 auto;
  border-radius: 999px;
  color: #fff;
  background: var(--tea-primary);
  font-size: 2rem;
  font-weight: 900;
}

.qty-stepper .btn {
  width: 44px;
}

.los-modal {
  z-index: 3005;
}

.los-modal .modal-dialog {
  pointer-events: auto;
  z-index: 3010;
}

.los-modal-content {
  background: var(--tea-surface) !important;
  color: var(--tea-text);
  border: 1px solid var(--tea-border);
  border-radius: 20px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}

.los-modal-content .modal-header,
.los-modal-content .modal-footer {
  border-color: var(--tea-border);
}

.los-modal-backdrop {
  z-index: 2995;
  opacity: .56 !important;
}
</style>
