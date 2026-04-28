import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CartItem {
  name: string
  price: number
  qty: number
}


const KEY = 'tea_platform_cart_v1'


function load(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}


function save(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items))
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(load())

  const totalCount = computed(() => items.value.reduce((s, i) => s + i.qty, 0))
  const totalPrice = computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0))

  function add(name: string, price: number, qty = 1) {
    const found = items.value.find(it => it.name === name)
    if (found) {
      found.qty = Math.min(99, found.qty + qty)
    } else {
      items.value.push({ name, price, qty })
    }
    save(items.value)
  }

  
  function updateQty(idx: number, qty: number) {
    if (idx >= 0 && idx < items.value.length) {
      items.value[idx].qty = Math.min(99, Math.max(1, Math.round(qty)))
      save(items.value)
    }
  }

  function remove(idx: number) {
    items.value.splice(idx, 1)
    save(items.value)
  }

  function clear() {
    items.value = []
    save(items.value)
  }

  return { items, totalCount, totalPrice, add, updateQty, remove, clear }
})
