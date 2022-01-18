<template>
  <form class="form-container">
    <slot></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">Submit</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from 'vue'
import bus from '@/utils/bus'
import { ValidationFunction, ValidationFunctions } from '@/types/components/form'

export default defineComponent({
  name: 'BaseForm',
  emits: ['form-submit'],
  setup(props, context) {
    const funcArr: ValidationFunctions = []

    const callback = (func: ValidationFunction) => {
      funcArr.push(func)
    }

    const submitForm = () => {
      const allValid = funcArr.map((func) => func()).every((result) => result)
      context.emit('form-submit', allValid)
    }

    bus.on('form-item-created', callback)

    onBeforeUnmount(() => {
      bus.off('form-item-created', callback)
    })

    return {
      submitForm
    }
  }
})
</script>

<style scoped></style>
