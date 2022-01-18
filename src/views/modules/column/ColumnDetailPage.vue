<template>
  <div v-if="column" class="column-detail-page w-75 mx-auto">
    <div v-if="column" class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 text-center">
        <img :src="column.avatar" :alt="column.title" class="rounded-circle border" />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
  <div v-else>未找到此专栏</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import PostList from '@/components/modules/post/PostList.vue'
import { useStore } from '@/store'
import { Column } from '@/types/modules/column'
import { Posts as TPostList } from '@/types/modules/post'

export default defineComponent({
  name: 'ColumnShowPage',
  components: { PostList },
  setup() {
    const route = useRoute()
    const store = useStore()

    const currentId = +route.params.id
    const column = computed<Column>(() => store.getters.getColumnById(currentId))
    const list = computed<TPostList>(() => store.getters.getPostsByColumnId(currentId))

    return {
      column,
      list
    }
  }
})
</script>

<style scoped></style>
