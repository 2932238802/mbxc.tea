import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface DashboardData {
  total_sales: number
  order_count: number
  avg_order_value: number
  customer_count: number
  recent_orders: Array<{
    id: number
    customer: string
    amount: number
    status: string
    date: string
  }>
  category_sales: Record<string, number>
  monthly_sales: Record<string, number>
  top_products: Record<string, number>
}

export const useDashboardStore = defineStore('dashboard', () => {
  const data = ref<DashboardData | null>(null)
  const loading = ref(false)
  const error = ref('')

  async function fetchData() {
    loading.value = true
    error.value = ''
    try {
      const res = await fetch('/static/data.json')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      data.value = await res.json()
      return data.value
    } catch (e: any) {
      error.value = e.message || '加载失败'
      return null
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchData }
})
