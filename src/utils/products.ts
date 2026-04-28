export interface TeaProduct {
  key: string
  grams: number
  label: string
  price?: number
}

export interface TeaGrade {
  basePrice500?: number
  specs: (number | TeaProduct)[]
}

export const TEA_PRODUCTS: Record<string, TeaGrade> = {
  '手工·匠心': {
    basePrice500: 3000,
    specs: [
      { key: '250', grams: 250, label: '250g' },
      { key: '250x2', grams: 500, label: '250g×2（礼盒装）', price: 3000 },
    ],
  },
  '特选级': {
    specs: [
      { key: '250', grams: 250, label: '250g', price: 950 },
      { key: '250x2', grams: 500, label: '250g×2（礼盒装）', price: 1899 },
    ],
  },
  '精选级': { basePrice500: 1399, specs: [250, 500] },
  '优选级': { basePrice500: 999, specs: [250, 500] },
}

export function normalizeTeaSpec(raw: number | TeaProduct): TeaProduct | null {
  if (typeof raw === 'number') return { key: String(raw), grams: raw, label: `${raw}g` }
  if (!raw || typeof raw !== 'object') return null
  const grams = Number(raw.grams)
  if (!Number.isFinite(grams) || grams <= 0) return null
  return {
    key: String(raw.key || `${grams}`),
    grams,
    label: String(raw.label || `${grams}g`),
    price: raw.price,
  }
}

export function calcTeaPrice(grade: string, spec: TeaProduct): number {
  if (!spec) return 0
  if (typeof spec.price === 'number' && Number.isFinite(spec.price)) return Math.round(spec.price)
  const product = TEA_PRODUCTS[grade]
  if (!product) return 0
  const base = Number(product.basePrice500) || 0
  return Math.round(base * (spec.grams / 500))
}

export function clampQty(v: number | string): number {
  const n = Number(v)
  if (!Number.isFinite(n)) return 1
  return Math.min(99, Math.max(1, Math.round(n)))
}
