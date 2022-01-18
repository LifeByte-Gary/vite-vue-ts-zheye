import { onMounted, onUnmounted, Ref, ref } from 'vue'

const useClickOutside = (elementRef: Ref<HTMLElement | null>) => {
  const isClickOutside = ref(false)

  const handler = (e: MouseEvent) => {
    if (elementRef.value && e.target) {
      isClickOutside.value = !elementRef.value?.contains(e.target as HTMLElement)
    }
  }

  onMounted(() => {
    document.addEventListener('click', handler)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })

  return isClickOutside
}

export default useClickOutside
