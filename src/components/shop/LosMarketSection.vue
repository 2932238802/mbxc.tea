<template>
  <div class="container py-5" id="market">
    <div class="section-title-wrapper">
      <h2 class="section-title">安顶云雾茶交易中心</h2>
      <a href="#" class="btn btn-outline-success rounded-pill btn-sm" @click.prevent="showAllModal = true">查看全部茶品</a>
    </div>

    <!-- Tabs -->
    <ul class="nav nav-pills mb-4" id="marketTabs" role="tablist">
      <li class="nav-item"><button class="nav-link active" data-bs-toggle="pill" data-bs-target="#pane-preorder"
          type="button">茶叶预定</button></li>
      <li class="nav-item"><button class="nav-link" data-bs-toggle="pill" data-bs-target="#pane-merch"
          type="button">文创周边</button></li>
    </ul>

    <div class="tab-content">
      <!-- Preorder Tab -->
      <div class="tab-pane fade show active" id="pane-preorder">
        <div class="row g-4">
          <div class="col-lg-7">
            <div class="card border-0 shadow-sm p-4 h-100">
              <h4 class="fw-bold mb-2">茶叶预定</h4>
              <p class="text-muted mb-4">
                安顶云雾茶<br>一脉千年贡茶底蕴，始于三国东吴皇宴臻饮，明洪武年间钦定贡茶，盛誉延绵至清扎根富阳安顶山350亩核心产区，坐拥"天空之境"独特高山云雾小气候，凝山水灵气成茶，手工炒制技艺为杭州市级非遗
              </p>
              <div class="row g-3">
                <div class="col-md-6" v-for="tea in preorderTeas" :key="tea.grade">
                  <ProductCard :img-src="tea.img" :title="tea.grade" :price="tea.price" :badge="tea.badge"
                    action-label="预定" @action="openAddToCart(tea.grade, tea.price, '茶叶')" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="card border-0 shadow-sm p-4">
              <h5 class="fw-bold mb-3">购物车速览</h5>
              <p class="text-muted mb-3">
                所有商品都会先加入购物车，完成信息填写后再统一在购物车里提交订单
              </p>
              <div class="cart-summary">
                <div class="cart-summary-row">
                  <span>商品数量</span>
                  <strong>{{ cart.totalCount }}</strong>
                </div>
                <div class="cart-summary-row">
                  <span>合计金额</span>
                  <strong class="text-success">¥{{ cart.totalPrice }}</strong>
                </div>
              </div>
              <button class="btn btn-success rounded-pill w-100 mt-3" @click="openCart">
                查看购物车
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Merch Tab -->
      <div class="tab-pane fade" id="pane-merch">
        <div class="row g-4">
          <div class="col-lg-3 col-md-6" v-for="item in merchItems" :key="item.name">
            <ProductCard :img-src="item.img" :title="item.name" :price="item.price" badge="文创" action-label="购买"
              @action="openAddToCart(item.name, item.price, '文创')" />
          </div>
        </div>
      </div>
    </div>

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
              <div class="text-muted">
                {{ loginModal.message || '请先登录后再操作购物车与下单' }}
              </div>
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

    <!-- All Products Modal -->
    <Teleport to="body">
      <div v-if="showAllModal" class="modal fade show d-block los-modal" tabindex="-1">
        <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content los-modal-content">
            <div class="modal-header">
              <h5 class="modal-title fw-bold">全部茶品</h5>
              <button type="button" class="btn-close" @click="showAllModal = false"></button>
            </div>
            <div class="modal-body">
              <div class="mb-4">
                <h6 class="fw-bold mb-2">茶叶预定</h6>
                <div class="row g-3">
                  <div class="col-md-6" v-for="tea in preorderTeas" :key="tea.grade">
                    <ProductCard :img-src="tea.img" :title="tea.grade" :price="tea.price" :badge="tea.badge"
                      action-label="预定" @action="openAddToCart(tea.grade, tea.price, '茶叶')" />
                  </div>
                </div>
              </div>
              <div>
                <h6 class="fw-bold mb-2">文创周边</h6>
                <div class="row g-3">
                  <div class="col-lg-3 col-md-6" v-for="item in merchItems" :key="item.name">
                    <ProductCard :img-src="item.img" :title="item.name" :price="item.price" badge="文创" action-label="购买"
                      @action="openAddToCart(item.name, item.price, '文创')" />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary rounded-pill px-4"
                @click="showAllModal = false">关闭</button>
            </div>
          </div>
        </div>
        <div class="modal-backdrop fade show los-modal-backdrop" @click="showAllModal = false"></div>
      </div>
    </Teleport>

    <!-- Add To Cart Modal（购买入口，只负责加入购物车）-->
    <Teleport to="body">
      <div v-if="addModal.show" class="modal fade show d-block los-modal" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content los-modal-content">
            <div class="modal-header">
              <div>
                <h5 class="modal-title fw-bold mb-0">加入购物车 · {{ addModal.name }}</h5>
                <div class="text-muted small mt-1">
                  单价¥{{ addModal.price }} · 数量{{ addModal.qty }} · 合计¥{{ addModal.price * addModal.qty }}
                </div>
              </div>
              <button type="button" class="btn-close" @click="addModal.show = false"></button>
            </div>
            <div class="modal-body">
              <div class="fw-bold mb-2">数量</div>
              <div class="input-group qty-stepper" style="max-width:260px">
                <button class="btn btn-outline-secondary" @click="addModal.qty = clampQty(addModal.qty - 1)">-</button>
                <input class="form-control text-center fw-bold" v-model.number="addModal.qty"
                  @blur="addModal.qty = clampQty(addModal.qty)">
                <button class="btn btn-outline-secondary" @click="addModal.qty = clampQty(addModal.qty + 1)">+</button>
              </div>

              <div class="tip-box mt-3">
                本平台不会在此直接扣款，提交购物车订单后平台客服将与您确认发货批次与支付方式
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-outline-secondary rounded-pill px-4" @click="addModal.show = false">取消</button>
              <button class="btn btn-success rounded-pill px-4" @click="confirmAddToCart">
                加入购物车
              </button>
            </div>
          </div>
        </div>
        <div class="modal-backdrop fade show los-modal-backdrop" @click="addModal.show = false"></div>
      </div>
    </Teleport>

    <!-- 加入成功提示弹窗 -->
    <Teleport to="body">
      <div v-if="successModal.show" class="modal fade show d-block los-modal" tabindex="-1">
        <div class="modal-dialog modal-sm modal-dialog-centered">
          <div class="modal-content success-modal los-modal-content">
            <div class="modal-body text-center py-4">
              <div class="success-icon">✓</div>
              <h5 class="fw-bold mt-3 mb-1">已加入购物车</h5>
              <div class="text-muted small">{{ successModal.message }}</div>
            </div>
            <div class="modal-footer justify-content-center border-0 pt-0">
              <button class="btn btn-outline-secondary rounded-pill px-4" @click="successModal.show = false">
                继续选购
              </button>
              <button class="btn btn-success rounded-pill px-4" @click="openCartFromSuccess">
                去购物车
              </button>
            </div>
          </div>
        </div>
        <div class="modal-backdrop fade show los-modal-backdrop" @click="successModal.show = false"></div>
      </div>
    </Teleport>

    <!-- Cart Modal -->
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
                    <button class="btn btn-sm btn-outline-danger rounded-pill"
                      :disabled="!cart.items.length"
                      @click="cart.clear()">清空</button>
                  </div>
                  <div v-if="!cart.items.length" class="empty-cart">
                    购物车还是空的，去挑点茶品或文创周边吧
                  </div>
                  <div v-for="(item, i) in cart.items" :key="i" class="cart-item">
                    <div class="d-flex justify-content-between align-items-start gap-3">
                      <div>
                        <div class="fw-bold">{{ item.name }}</div>
                        <div class="text-muted small">单价¥{{ item.price }}</div>
                      </div>
                      <button class="btn btn-sm btn-outline-danger rounded-pill" @click="cart.remove(i)">删除</button>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                      <div class="input-group qty-stepper" style="max-width:220px">
                        <button class="btn btn-outline-secondary" @click="cart.updateQty(i, item.qty - 1)">-</button>
                        <input class="form-control text-center fw-bold" :value="item.qty"
                          @blur="cart.updateQty(i, Number(($event.target as HTMLInputElement).value))">
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
                      <textarea class="form-control" v-model="checkout.note" rows="3"
                        placeholder="可填写发货批次偏好、是否礼盒等"></textarea>
                    </div>

                    <div v-if="submitError" class="col-12">
                      <div class="alert alert-danger py-2 mb-0">{{ submitError }}</div>
                    </div>

                    <div class="col-12 d-grid">
                      <button class="btn btn-success rounded-pill"
                        :disabled="submitting || !cart.items.length"
                        @click="submitOrder">
                        <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
                        {{ submitting ? '提交中…' : '提交订单' }}
                      </button>
                    </div>

                    <div class="col-12">
                      <div class="text-muted small">
                        提交订单后，平台客服会与您确认发货批次与支付方式
                      </div>
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
              <button class="btn btn-success rounded-pill px-4" @click="orderSuccessModal.show = false">
                好的
              </button>
            </div>
          </div>
        </div>
        <div class="modal-backdrop fade show los-modal-backdrop" @click="orderSuccessModal.show = false"></div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { clampQty } from '@/utils/products'
import { createOrder } from '@/utils/orders'
import ProductCard from './LosProductCard.vue'
import { assetUrl } from '@/utils/asset'

const cart = useCartStore()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const preorderTeas = [
  { grade: '手工·匠心', price: 3000, img: assetUrl('手工·匠心.jpg'), badge: '限量预定' },
  { grade: '特选级', price: 1899, img: assetUrl('特选级.jpg'), badge: '限量预定' },
  { grade: '精选级', price: 1399, img: assetUrl('精选级.jpg'), badge: '预定' },
  { grade: '优选级', price: 999, img: assetUrl('优选级.jpg'), badge: '预定' },
]

const merchItems = [
  { name: '茶小泽钥匙扣', price: 29, img: assetUrl('钥匙扣.jpg') },
  { name: '茶小泽金属冰箱贴', price: 59, img: assetUrl('金属冰箱贴.jpg') },
  { name: '茶小泽系列盲盒', price: 69, img: assetUrl('系列盲盒.jpg') },
  { name: '茶小泽茶宠', price: 179, img: assetUrl('茶宠.jpg') },
]

const showAllModal = ref(false)

const addModal = reactive({
  show: false,
  name: '',
  price: 0,
  qty: 1,
  kind: '文创',
})

const successModal = reactive({
  show: false,
  message: '',
})

const orderSuccessModal = reactive({
  show: false,
  orderId: 0,
  total: 0,
})

const loginModal = reactive({
  show: false,
  message: '',
})

function requireLogin(message: string): boolean {
  if (authStore.isLoggedIn) return true
  loginModal.message = message
  loginModal.show = true
  return false
}

function goLogin() {
  loginModal.show = false
  const redirect = route.fullPath || '/market'
  router.push({ path: '/login', query: { redirect } })
}

function openAddToCart(name: string, price: number, kind: string) {
  if (!requireLogin('登录后即可把商品加入购物车并完成下单')) return
  addModal.name = name
  addModal.price = price
  addModal.qty = 1
  addModal.kind = kind
  addModal.show = true
}

function openCart() {
  if (!requireLogin('登录后即可查看和结算购物车')) return
  cartModal.show = true
}

function confirmAddToCart() {
  const qty = clampQty(addModal.qty)
  cart.add(addModal.name, addModal.price, qty)
  successModal.message = `${addModal.name} × ${qty}`
  successModal.show = true
  addModal.show = false
}

function openCartFromSuccess() {
  successModal.show = false
  cartModal.show = true
}

const cartModal = reactive({ show: false })
const checkout = reactive({ name: '', phone: '', addr: '', note: '' })
const submitting = ref(false)
const submitError = ref('')

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

function onOpenCart() {
  if (!requireLogin('登录后即可查看和结算购物车')) return
  cartModal.show = true
}

onMounted(() => window.addEventListener('open-cart', onOpenCart))
onUnmounted(() => window.removeEventListener('open-cart', onOpenCart))
</script>

<style scoped>
.section-title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid var(--tea-border);
  padding-bottom: 10px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 800;
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

#marketTabs .nav-link {
  border: 1px solid var(--tea-border);
  color: var(--tea-primary);
  background: var(--tea-surface);
  border-radius: 999px;
  padding: 8px 16px;
  margin-right: 10px;
}

#marketTabs .nav-link.active {
  background: var(--tea-primary-soft) !important;
  color: var(--tea-primary) !important;
}

.cart-summary {
  display: grid;
  gap: 10px;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid var(--tea-border);
  background: var(--tea-surface);
}

.cart-summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--tea-text-muted);
}

.cart-summary-row strong {
  color: var(--tea-text);
  font-size: 1.1rem;
}

.tip-box {
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--tea-primary-soft);
  color: var(--tea-primary);
  font-size: .88rem;
}

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

.modal {
  z-index: 3005;
}

.modal-backdrop {
  z-index: 2995;
}
</style>
