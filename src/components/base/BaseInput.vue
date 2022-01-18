<template>
  <div>
    <input
      v-if="tagType === 'input'"
      type="text"
      class="form-control"
      :class="[{ 'is-invalid': inputRef.error }]"
      v-model="inputRef.value"
      @blur="validateInput"
      @input="updateInput"
      v-bind="$attrs"
    />
    <textarea v-else type="text" class="form-control" :class="[{ 'is-invalid': inputRef.error }]" v-model="inputRef.value" @blur="validateInput" @input="updateInput" v-bind="$attrs" />
    <span v-if="inputRef.error" class="invalid-feedback">
      {{ inputRef.message }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue'
import { InputRules, InputTagType, ValidationFunction } from '@/types/components/form'
import bus from '@/utils/bus'

const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default defineComponent({
  name: 'BaseInput',
  props: {
    rules: {
      type: Array as PropType<InputRules>
    },
    modelValue: String,
    tagType: {
      type: String as PropType<InputTagType>,
      default: 'input'
    }
  },
  inheritAttrs: false,
  setup(props, context) {
    const inputRef = reactive({
      value: props.modelValue || '',
      error: false,
      message: ''
    })

    const updateInput = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.value = targetValue
      context.emit('update:modelValue', targetValue)
    }

    const validateInput: ValidationFunction = () => {
      if (props.rules && props.rules.length) {
        const isValid = props.rules.every((rule) => {
          let isPassed = true
          inputRef.message = rule.message

          switch (rule.type) {
            case 'required':
              isPassed = inputRef.value.trim() !== ''
              break
            case 'email':
              isPassed = emailReg.test(inputRef.value.trim())
              break
            default:
              break
          }

          return isPassed
        })

        inputRef.error = !isValid

        return isValid
      }

      return true
    }

    onMounted(() => {
      bus.emit('form-item-created', validateInput)
    })

    return {
      inputRef,
      validateInput,
      updateInput
    }
  }
})
</script>

<style scoped></style>
