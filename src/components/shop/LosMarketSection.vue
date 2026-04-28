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
              <h4 class="fw-bold mb-2"><i class="fas fa-seedling text-success me-2"></i> 茶叶预定</h4>
              <p class="text-muted mb-4">
                安顶云雾茶<br>一脉千年贡茶底蕴，始于三国东吴皇宴臻饮，明洪武年间钦定贡茶，盛誉延绵至清扎根富阳安顶山350亩核心产区，坐拥"天空之境"独特高山云雾小气候，凝山水灵气成茶，手工炒制技艺为杭州市级非遗
              </p>
              <div class="row g-3">
                <div class="col-md-6" v-for="tea in preorderTeas" :key="tea.grade">
                  <ProductCard :img-src="tea.img" :title="tea.grade" :price="tea.price" :badge="tea.badge"
                    action-label="预定" @action="openPreorder(tea.grade)" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="card border-0 shadow-sm p-4">
              <h5 class="fw-bold mb-3"><i class="fas fa-clipboard-list text-success me-2"></i> 提交预定</h5>
              <form @submit.prevent="submitPreorder" class="row g-3">
                <div class="col-12">
                  <label class="form-label mb-1">预定等级</label>
                  <select class="form-select" v-model="preorderForm.grade" required>
                    <option value="" disabled>请选择等级</option>
                    <option value="手工·匠心">手工·匠心</option>
                    <option value="特选级">特选级</option>
                    <option value="精选级">精选级</option>
                    <option value="优选级">优选级</option>
                  </select>
                </div>
                <div class="col-12">
                  <label class="form-label mb-1">数量（盒）</label>
                  <input type="number" min="1" max="99" class="form-control" v-model="preorderForm.qty" required>
                </div>
                <div class="col-12 d-grid">
                  <button type="submit" class="btn btn-success rounded-pill"><i
                      class="fas fa-lock me-2"></i>锁定预定</button>
                </div>
                <div class="col-12" v-if="preorderResult">
                  <div class="text-success fw-semibold">{{ preorderResult }}</div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Merch Tab -->
      <div class="tab-pane fade" id="pane-merch">
        <div class="row g-4">
          <div class="col-lg-3 col-md-6" v-for="item in merchItems" :key="item.name">
            <ProductCard :img-src="item.img" :title="item.name" :price="item.price" badge="文创" action-label="购买"
              @action="openMerchBuy(item.name, item.price)" />
          </div>
        </div>
      </div>
    </div>

    <!-- All Products Modal -->
    <Teleport to="body">
      <div v-if="showAllModal" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title fw-bold"><i class="fas fa-bag-shopping text-success me-2"></i>全部茶品</h5>
              <button type="button" class="btn-close" @click="showAllModal = false"></button>
            </div>
            <div class="modal-body">
              <div class="mb-4">
                <h6 class="fw-bold mb-2">茶叶预定</h6>
                <div class="row g-3">
                  <div class="col-md-6" v-for="tea in preorderTeas" :key="tea.grade">
                    <ProductCard :img-src="tea.img" :title="tea.grade" :price="tea.price" :badge="tea.badge"
                      action-label="预定" @action="openPreorder(tea.grade)" />
                  </div>
                </div>
              </div>
              <div>
                <h6 class="fw-bold mb-2">文创周边</h6>
                <div class="row g-3">
                  <div class="col-lg-3 col-md-6" v-for="item in merchItems" :key="item.name">
                    <ProductCard :img-src="item.img" :title="item.name" :price="item.price" badge="文创" action-label="购买"
                      @action="openMerchBuy(item.name, item.price)" />
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
        <div class="modal-backdrop fade show" @click="showAllModal = false"></div>
      </div>
    </Teleport>

    <!-- Preorder Modal -->
    <Teleport to="body">
      <div v-if="preorderModal.show" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <div>
                <h5 class="modal-title fw-bold mb-0">{{ preorderModal.grade }} · 预定</h5>
                <div class="text-muted small mt-1">{{ preorderModal.summary }}</div>
              </div>
              <button type="button" class="btn-close" @click="preorderModal.show = false"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <div class="fw-bold mb-2">产品规格</div>
                <div class="spec-grid">
                  <button v-for="spec in preorderModal.specs" :key="spec.key" class="spec-option"
                    :class="{ 'is-selected': preorderModal.selKey === spec.key }" @click="selectSpec(spec.key)">
                    <div class="spec-option-title">{{ spec.label }}</div>
                    <div class="spec-option-meta">¥{{ spec.price }}</div>
                  </button>
                </div>
              </div>
              <div>
                <div class="fw-bold mb-2">数量</div>
                <div class="input-group qty-stepper" style="max-width:260px">
                  <button class="btn btn-outline-secondary"
                    @click="preorderModal.qty = clampQty(preorderModal.qty - 1)">-</button>
                  <input class="form-control text-center fw-bold" v-model.number="preorderModal.qty"
                    @blur="preorderModal.qty = clampQty(preorderModal.qty)">
                  <button class="btn btn-outline-secondary"
                    @click="preorderModal.qty = clampQty(preorderModal.qty + 1)">+</button>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-outline-secondary rounded-pill px-4"
                @click="preorderModal.show = false">取消</button>
              <button class="btn btn-success rounded-pill px-4" @click="confirmPreorder"><i
                  class="fas fa-check me-2"></i>确认预定</button>
            </div>
          </div>
        </div>
        <div class="modal-backdrop fade show" @click="preorderModal.show = false"></div>
      </div>
    </Teleport>

    <!-- Merch Buy Modal -->
    <Teleport to="body">
      <div v-if="merchModal.show" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <div>
                <h5 class="modal-title fw-bold mb-0">购买 · {{ merchModal.name }}</h5>
                <div class="text-muted small mt-1">单价¥{{ merchModal.price }} · 数量{{ merchModal.qty }} · 合计¥{{
                  merchModal.price * merchModal.qty }}</div>
              </div>
              <button type="button" class="btn-close" @click="merchModal.show = false"></button>
            </div>
            <div class="modal-body">
              <div class="fw-bold mb-2">数量</div>
              <div class="input-group qty-stepper" style="max-width:260px">
                <button class="btn btn-outline-secondary"
                  @click="merchModal.qty = clampQty(merchModal.qty - 1)">-</button>
                <input class="form-control text-center fw-bold" v-model.number="merchModal.qty"
                  @blur="merchModal.qty = clampQty(merchModal.qty)">
                <button class="btn btn-outline-secondary"
                  @click="merchModal.qty = clampQty(merchModal.qty + 1)">+</button>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-outline-secondary rounded-pill px-4" @click="merchModal.show = false">取消</button>
              <button class="btn btn-outline-success rounded-pill px-4" @click="addToCart"><i
                  class="fas fa-cart-plus me-2"></i>加入购物车</button>
              <button class="btn btn-success rounded-pill px-4" @click="buyNow"><i
                  class="fas fa-bolt me-2"></i>立即购买</button>
            </div>
          </div>
        </div>
        <div class="modal-backdrop fade show" @click="merchModal.show = false"></div>
      </div>
    </Teleport>

    <!-- Toast -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index:2100">
      <div ref="toastRef" class="toast align-items-center text-bg-success border-0" role="alert">
        <div class="d-flex">
          <div class="toast-body">{{ toastMsg }}</div>
          <button class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>
    </div>

    <!-- Cart Modal -->
    <Teleport to="body">
      <div v-if="cartModal.show" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title fw-bold"><i class="fas fa-shopping-cart text-success me-2"></i>购物车</h5>
              <button type="button" class="btn-close" @click="cartModal.show = false"></button>
            </div>
            <div class="modal-body">
              <div class="row g-4">
                <div class="col-lg-7">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <div class="fw-bold">已选商品</div>
                    <button class="btn btn-sm btn-outline-danger rounded-pill" @click="cart.clear()">清空</button>
                  </div>
                  <div v-if="!cart.items.length" class="text-muted">购物车还是空的～去挑点文创周边吧！</div>
                  <div v-for="(item, i) in cart.items" :key="i" class="border rounded p-3 mb-2">
                    <div class="d-flex justify-content-between align-items-start gap-3">
                      <div>
                        <div class="fw-bold">{{ item.name }}</div>
                        <div class="text-muted small">单价：¥{{ item.price }}</div>
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
                      <div class="fw-bold">小计：<span class="text-success">¥{{ item.price * item.qty }}</span></div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end mt-3">
                    <div class="fw-bold">合计：<span class="text-success">¥{{ cart.totalPrice }}</span></div>
                  </div>
                </div>
                <div class="col-lg-5">
                  <div class="fw-bold mb-2">结算信息</div>
                  <div class="row g-3">
                    <div class="col-12"><label class="form-label mb-1">收货人</label><input class="form-control"
                        v-model="checkout.name" placeholder="请输入收货人姓名"></div>
                    <div class="col-12"><label class="form-label mb-1">电话</label><input class="form-control"
                        v-model="checkout.phone" placeholder="请输入手机号"></div>
                    <div class="col-12"><label class="form-label mb-1">地址</label><input class="form-control"
                        v-model="checkout.addr" placeholder="请输入详细地址"></div>
                    <div class="col-12"><label class="form-label mb-1">备注</label><textarea class="form-control"
                        v-model="checkout.note" rows="3" placeholder="可填写发货批次偏好、是否礼盒等"></textarea></div>
                    <div class="col-12 d-grid"><button class="btn btn-success rounded-pill" @click="submitOrder"><i
                          class="fas fa-check me-2"></i>提交订单</button></div>
                    <div class="col-12">
                      <div class="text-muted small">提交后平台客服会与您确认【发货批次】与【支付方式】</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-backdrop fade show" @click="cartModal.show = false"></div>
      </div>
    </Teleport>
  </div>
</template>

<!---------------------------------------------------------->


<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import { TEA_PRODUCTS, normalizeTeaSpec, calcTeaPrice, clampQty } from '@/utils/products'
import ProductCard from './LosProductCard.vue'
import { Toast } from 'bootstrap'

const cart = useCartStore()

const preorderTeas = [
  { grade: '手工·匠心', price: 3000, img: '/手工·匠心.jpg', badge: '限量预定' },
  { grade: '特选级', price: 1899, img: '/特选级.jpg', badge: '限量预定' },
  { grade: '精选级', price: 1399, img: '/精选级.jpg', badge: '预定' },
  { grade: '优选级', price: 999, img: '/优选级.jpg', badge: '预定' },
]

const merchItems = [
  { name: '茶小泽钥匙扣', price: 29, img: '/钥匙扣.jpg' },
  { name: '茶小泽金属冰箱贴', price: 59, img: '/金属冰箱贴.jpg' },
  { name: '茶小泽系列盲盒', price: 69, img: '/系列盲盒.jpg' },
  { name: '茶小泽茶宠', price: 179, img: '/茶宠.jpg' },
]

const showAllModal = ref(false)

const preorderForm = reactive({ grade: '', qty: 1 })
const preorderResult = ref('')

function submitPreorder() {
  if (!preorderForm.grade) return
  preorderResult.value = `✅ 预定已提交：${preorderForm.grade} · ${preorderForm.qty}盒请联系客服确认【发货批次】与【支付方式】`
}

// Preorder Modal
const preorderModal = reactive({
  show: false, grade: '', selKey: '', qty: 1, summary: '',
  specs: [] as Array<{ key: string; grams: number; label: string; price: number }>,
})

function openPreorder(grade: string) {
  const product = TEA_PRODUCTS[grade]
  if (!product) return
  const specs = product.specs.map(normalizeTeaSpec).filter(Boolean)
  if (!specs.length) return
  preorderModal.grade = grade
  preorderModal.show = true
  preorderModal.qty = 1
  preorderModal.specs = specs.map(s => ({ ...s!, price: calcTeaPrice(grade, s!) }))
  preorderModal.selKey = String(specs[0]?.key || '')
  updatePreorderSummary()
}

function selectSpec(key: string) {
  preorderModal.selKey = key
  updatePreorderSummary()
}

function updatePreorderSummary() {
  const spec = preorderModal.specs.find(s => s.key === preorderModal.selKey)
  if (spec) {
    const total = spec.price * preorderModal.qty
    preorderModal.summary = `已选：${preorderModal.grade} · ${spec.label} · 单价¥${spec.price} · 数量${preorderModal.qty} · 合计¥${total}`
  }
}

function confirmPreorder() {
  preorderForm.grade = preorderModal.grade
  preorderForm.qty = preorderModal.qty
  preorderModal.show = false
}

// Merch Modal
const merchModal = reactive({ show: false, name: '', price: 0, qty: 1 })
const toastRef = ref<HTMLElement>()
const toastMsg = ref('')

function openMerchBuy(name: string, price: number) {
  merchModal.name = name; merchModal.price = price; merchModal.qty = 1; merchModal.show = true
}

function showToast(msg: string) {
  toastMsg.value = msg
  if (toastRef.value) Toast.getOrCreateInstance(toastRef.value, { delay: 2400 }).show()
}

function addToCart() {
  cart.add(merchModal.name, merchModal.price, merchModal.qty)
  showToast(`已加入购物车：${merchModal.name} × ${merchModal.qty}`)
  merchModal.show = false
}

function buyNow() {
  cart.add(merchModal.name, merchModal.price, merchModal.qty)
  merchModal.show = false
  cartModal.show = true
}

const cartModal = reactive({ show: false })
const checkout = reactive({ name: '', phone: '', addr: '', note: '' })

function submitOrder() {
  showToast('订单已提交，客服将尽快与您联系确认！')
  cartModal.show = false
}

function onOpenCart() { cartModal.show = true }
onMounted(() => window.addEventListener('open-cart', onOpenCart))
onUnmounted(() => window.removeEventListener('open-cart', onOpenCart))
</script>



<!---------------------------------------------------------->
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

#marketTabs .nav-link {
  border: 1px solid rgba(0, 104, 59, 0.18);
  color: var(--tea-primary);
  background: rgba(255, 255, 255, 0.72);
  border-radius: 999px;
  padding: 8px 16px;
  margin-right: 10px;
}

#marketTabs .nav-link.active {
  background: rgba(0, 104, 59, 0.14) !important;
  color: var(--tea-primary) !important;
}

.spec-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.spec-option {
  border: 1px solid rgba(0, 104, 59, 0.22);
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 10px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  transition: all 0.18s ease;
}

.spec-option:hover {
  border-color: rgba(0, 104, 59, 0.38);
  background: rgba(0, 104, 59, 0.06);
}

.spec-option.is-selected {
  border-color: rgba(0, 104, 59, 0.7);
  background: rgba(0, 104, 59, 0.10);
}

.spec-option-title {
  font-weight: 800;
  color: #1b4d24;
}

.spec-option-meta {
  font-weight: 800;
  color: #e53935;
  white-space: nowrap;
}

.qty-stepper .btn {
  width: 44px;
}

.modal {
  z-index: 3005;
}

.modal-backdrop {
  z-index: 2995;
}
</style>
