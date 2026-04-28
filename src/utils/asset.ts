import { computed } from 'vue'
import { useRouter } from 'vue-router'

const BASE_URL = import.meta.env.BASE_URL || '/'

export function assetUrl(name: string) {
  const cleanBase = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`
  const cleanName = name.startsWith('/') ? name.slice(1) : name
  return `${cleanBase}${cleanName}`
}

export function useLosNavigate() {
  const router = useRouter()

  function go(path: string) {
    router.push(path)
  }

  return { go }
}
