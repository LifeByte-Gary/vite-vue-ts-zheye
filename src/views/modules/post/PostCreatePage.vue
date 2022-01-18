<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <base-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <base-input :rules="titleProps.rules" v-model="titleProps.value" placeholder="请输入文章标题" type="text" />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <base-input tag-type="textarea" rows="10" type="text" placeholder="请输入文章详情" :rules="contentProps.rules" v-model="contentProps.value" />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">创建</button>
      </template>
    </base-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import BaseForm from '@/components/base/BaseForm.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import { InputProps } from '@/types/components/form'
import { Post } from '@/types/modules/post'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

export default defineComponent({
  name: 'PostCreatePage',
  components: { BaseInput, BaseForm },
  props: {},
  setup() {
    const router = useRouter()
    const store = useStore()

    const titleProps = reactive<InputProps>({
      value: '',
      rules: [{ type: 'required', message: '文章标题不能为空' }]
    })
    const contentProps = reactive<InputProps>({
      value: '',
      rules: [{ type: 'required', message: '文章标题不能为空' }]
    })

    const onFormSubmit = (isValid: boolean) => {
      if (isValid) {
        const { columnId } = store.state.user

        if (columnId) {
          const newPost: Post = {
            columnId,
            content: contentProps.value as string,
            createdAt: new Date().toISOString(),
            id: new Date().getTime(),
            title: titleProps.value as string
          }

          store.commit('createPost', newPost)
          router.push({ name: 'columns.show', params: { id: columnId } })
        }
      }
    }

    return {
      titleProps,
      contentProps,
      onFormSubmit
    }
  }
})
</script>

<style scoped></style>
