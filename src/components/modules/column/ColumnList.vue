<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar" :alt="column.title" class="rounded-circle border border-light w-25 my-3" />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <router-link :to="{ name: 'columns.show', params: { id: column.id } }" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { Columns } from '@/types/modules/column'
import defaultAvatar from '@/assets/column.jpg'

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<Columns>,
      required: true
    }
  },
  setup(props) {
    const columnList = computed(() => {
      return props.list.map((column) => {
        const currentColumn = column
        currentColumn.avatar = column.avatar ?? defaultAvatar

        return currentColumn
      })
    })

    return {
      columnList
    }
  }
})
</script>

<style scoped></style>
