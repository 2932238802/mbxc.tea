import { ref, reactive } from 'vue'

interface PointerInfo { x: number; y: number }

export function useImagePreview() {
  const isOpen = ref(false)
  const imgSrc = ref('')
  const imgTitle = ref('')
  const imgDownloadHref = ref('#')
  const viewportRef = ref<HTMLElement>()
  const imgRef = ref<HTMLImageElement>()

  const state = reactive({
    scale: 1, x: 0, y: 0,
    activePointers: new Map<number, PointerInfo>(),
    draggingId: null as number | null,
    startX: 0, startY: 0,
    pinchStartDist: 0, pinchStartScale: 1,
    pinchStartX: 0, pinchStartY: 0,
    pinchCenterX: 0, pinchCenterY: 0,
  })

  function clamp(v: number) { return Math.min(4, Math.max(1, v)) }

  function apply() {
    if (!imgRef.value) return
    imgRef.value.style.transform =
      `translate3d(${state.x}px, ${state.y}px, 0) scale(${state.scale})`
  }

  function reset() {
    state.scale = 1; state.x = 0; state.y = 0
    state.activePointers.clear(); state.draggingId = null
    apply()
  }

  function zoomAround(cx: number, cy: number, s: number) {
    const prev = state.scale
    const scale = clamp(s)
    if (scale === prev) return
    const r = scale / prev
    state.x = state.x * r + cx * (1 - r)
    state.y = state.y * r + cy * (1 - r)
    state.scale = scale
    apply()
  }

  function open(src: string, title: string = '查看大图') {
    imgSrc.value = src
    imgTitle.value = title
    const filename = src.split('/').pop() || 'image'
    imgDownloadHref.value = src
    isOpen.value = true
    reset()
  }

  function close() { isOpen.value = false }

  function onWheel(e: WheelEvent) {
    e.preventDefault()
    if (!viewportRef.value) return
    const r = viewportRef.value.getBoundingClientRect()
    const s = e.deltaY > 0 ? 0.92 : 1.08
    zoomAround(e.clientX - r.left, e.clientY - r.top, state.scale * s)
  }

  function onPointerDown(e: PointerEvent) {
    if (!viewportRef.value) return
    viewportRef.value.setPointerCapture(e.pointerId)
    state.activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (state.activePointers.size === 1) {
      state.draggingId = e.pointerId
      state.startX = e.clientX - state.x
      state.startY = e.clientY - state.y
    }
    if (state.activePointers.size === 2) {
      const pts = Array.from(state.activePointers.values())
      const dx = pts[0].x - pts[1].x, dy = pts[0].y - pts[1].y
      state.pinchStartDist = Math.hypot(dx, dy) || 1
      state.pinchStartScale = state.scale
      state.pinchStartX = state.x; state.pinchStartY = state.y
      const r = viewportRef.value!.getBoundingClientRect()
      state.pinchCenterX = (pts[0].x + pts[1].x) / 2 - r.left
      state.pinchCenterY = (pts[0].y + pts[1].y) / 2 - r.top
      state.draggingId = null
    }
  }

  function onPointerMove(e: PointerEvent) {
    if (!state.activePointers.has(e.pointerId)) return
    state.activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (state.activePointers.size === 2) {
      const pts = Array.from(state.activePointers.values())
      const dx = pts[0].x - pts[1].x, dy = pts[0].y - pts[1].y
      const dist = Math.hypot(dx, dy) || 1
      const s = clamp(state.pinchStartScale * (dist / state.pinchStartDist))
      const r = s / state.pinchStartScale
      state.scale = s
      state.x = state.pinchStartX * r + state.pinchCenterX * (1 - r)
      state.y = state.pinchStartY * r + state.pinchCenterY * (1 - r)
      apply()
      return
    }
    if (state.draggingId !== e.pointerId) return
    state.x = e.clientX - state.startX
    state.y = e.clientY - state.startY
    apply()
  }

  function onPointerUp(e: PointerEvent) {
    state.activePointers.delete(e.pointerId)
    if (state.draggingId === e.pointerId) state.draggingId = null
    if (state.activePointers.size === 1) {
      state.draggingId = Array.from(state.activePointers.keys())[0]
    }
  }

  return {
    isOpen, imgSrc, imgTitle, imgDownloadHref, viewportRef, imgRef,
    open, close, reset, onWheel, onPointerDown, onPointerMove, onPointerUp,
  }
}
