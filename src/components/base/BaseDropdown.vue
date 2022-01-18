<template>
  <div class="dropdown" ref="dropdownRef">
    <button class="btn btn-secondary dropdown-toggle" type="button" @click="toggleDropdown">
      {{ title }}
    </button>
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-show="dropdownStatus.isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import useClickOutside from '@/hooks/useClickOutside'

export default defineComponent({
  name: 'BaseDropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const dropdownRef = ref<null | HTMLElement>(null)

    const dropdownStatus = reactive({
      isOpen: false
    })

    const toggle = () => {
      dropdownStatus.isOpen = !dropdownStatus.isOpen
    }

    const isClickOutside = useClickOutside(dropdownRef)

    watch(isClickOutside, () => {
      if (dropdownStatus.isOpen && isClickOutside.value) {
        dropdownStatus.isOpen = false
      }
    })

    return {
      dropdownStatus,
      toggleDropdown: toggle,
      dropdownRef
    }
  }
})
</script>

<style scoped></style>
