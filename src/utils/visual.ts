export type VisualKey =
  | 'leaf'
  | 'fire'
  | 'study'
  | 'route'
  | 'cup'
  | 'gift'
  | 'sensor'
  | 'brain'
  | 'weather'
  | 'water'
  | 'trace'
  | 'qr'
  | 'chip'
  | 'vr'
  | 'brand'
  | 'finance'
  | 'research'
  | 'carbon'
  | 'cart'
  | 'tea'

const visualMap: Record<VisualKey, { icon: string; label: string }> = {
  leaf: { icon: '🍃', label: '茶叶' },
  fire: { icon: '🔥', label: '炒茶' },
  study: { icon: '📚', label: '研学' },
  route: { icon: '🧭', label: '导览' },
  cup: { icon: '🍵', label: '茶香' },
  gift: { icon: '🎁', label: '茶礼' },
  sensor: { icon: '📡', label: '感知' },
  brain: { icon: '🧠', label: '决策' },
  weather: { icon: '⛈️', label: '预警' },
  water: { icon: '💧', label: '水肥' },
  trace: { icon: '⚖️', label: '溯源' },
  qr: { icon: '▦', label: '茶标' },
  chip: { icon: '⚙️', label: '硬件' },
  vr: { icon: '🥽', label: '元宇宙' },
  brand: { icon: '📣', label: '品牌' },
  finance: { icon: '💰', label: '金融' },
  research: { icon: '📊', label: '调研' },
  carbon: { icon: '🌳', label: '碳汇' },
  cart: { icon: '🛒', label: '交易' },
  tea: { icon: '茶', label: '云雾茶' },
}

export function visualIcon(key: VisualKey) {
  return visualMap[key]?.icon || '茶'
}

export function visualLabel(key: VisualKey) {
  return visualMap[key]?.label || '安顶山茶'
}
