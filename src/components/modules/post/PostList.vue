<template>
  <div class="post-list">
    <article v-for="post in list" :key="post.id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>{{ post.title }}</h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image.url" class="col-3">
            <img :src="`${post.image.url}?x-oss-process=image/resize,m_pad,h_50,w_50`" :alt="post.title" class="rounded-lg" />
          </div>
          <p :class="{ 'col-9': post.image }">{{ post.content }}</p>
        </div>
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Posts } from '@/types/modules/post'

export default defineComponent({
  props: {
    list: {
      required: true,
      type: Array as PropType<Posts>
    }
  }
})
</script>

<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>
