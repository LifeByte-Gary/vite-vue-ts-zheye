<template>
  <app-loader v-if="isLoadingColumnList"></app-loader>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="@/assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import ColumnList from '@/components/modules/column/ColumnList.vue'
import { useStore } from '@/store'
import useLoader from '@/hooks/useLoader'
import AppLoader from '@/components/app/AppLoader.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    AppLoader,
    ColumnList
  },
  setup() {
    const store = useStore()

    const list = computed(() => store.state.column.columnList)

    const isLoadingColumnList = ref(true)

    onMounted(async () => {
      const { loading } = await useLoader(store.dispatch('column/fetchColumnList'))
      isLoadingColumnList.value = loading.value
    })

    return { list, isLoadingColumnList }
  }
})
</script>

<style scoped></style>
