<template>
  <div v-if="currentColumn" class="column-detail-page w-75 mx-auto">
    <div v-if="currentColumn" class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 text-center">
        <img :src="currentColumn.avatar.url" :alt="currentColumn.title" class="rounded-circle border" />
      </div>
      <div class="col-9">
        <h4>{{ currentColumn.title }}</h4>
        <p class="text-muted">{{ currentColumn.description }}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
  <div v-else>未找到此专栏</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import PostList from '@/components/modules/post/PostList.vue'
import { useStore } from '@/store'
import api from '@/api'
import { Column } from '@/types/modules/column'
import defaultAvatar from '@/assets/column.jpg'

export default defineComponent({
  name: 'ColumnDetailPage',
  components: { PostList },
  setup() {
    const route = useRoute()
    const store = useStore()

    const currentColumn = reactive({
      _id: '' as string,
      title: '' as string,
      description: '' as string,
      avatar: {
        url: '' as string
      }
    })

    const currentId = route.params.id as string

    onMounted(() => {
      store.dispatch('post/fetchPostListByColumnId', currentId)
    })

    api.column.getColumnDetail(currentId).then((data: Column) => {
      currentColumn._id = data._id
      currentColumn.title = data.title
      currentColumn.description = data.description
      currentColumn.avatar.url = data?.avatar?.url || defaultAvatar
    })

    const postList = computed(() => store.state.post.postList)

    return {
      currentColumn,
      list: postList
    }
  }
})
</script>

<style scoped></style>
