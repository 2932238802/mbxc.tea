import { apiRequest } from '@/utils/api'

export interface OrderItemInput {
  name: string
  price: number
  qty: number
}

export interface OrderItemResponse {
  id: number
  name: string
  price: number
  qty: number
}

export interface OrderResponse {
  id: number
  contact_name: string
  contact_phone: string
  contact_address: string
  note: string | null
  total_price: number
  status: string
  created_at: string
  items: OrderItemResponse[]
}

export interface OrderCreatePayload {
  contact_name: string
  contact_phone: string
  contact_address: string
  note?: string | null
  items: OrderItemInput[]
}

export function createOrder(
  payload: OrderCreatePayload,
  token?: string,
) {
  const headers: Record<string, string> = {}
  if (token) headers['Authorization'] = `Bearer ${token}`

  return apiRequest<OrderResponse>('/api/orders', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  })
}
