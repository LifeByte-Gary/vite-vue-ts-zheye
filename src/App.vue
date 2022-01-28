<template>
  <app-header></app-header>

  <div class="container">
    <router-view></router-view>
  </div>

  <app-footer></app-footer>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import AppHeader from '@/components/app/AppHeader.vue'
import AppFooter from '@/components/app/AppFooter.vue'
import { useStore } from '@/store'
import { apiAxiosInstance } from '@/utils/http'

export default defineComponent({
  name: 'App',
  components: { AppHeader, AppFooter },
  setup() {
    const store = useStore()
    const token = computed(() => store.state.auth.token)
    const currentUser = computed(() => store.state.auth.currentUser)

    onMounted(() => {
      if (!currentUser.value && token.value) {
        apiAxiosInstance.defaults.headers.common.Authorization = `Bearer ${token.value}`
        store.dispatch('auth/fetchCurrentUser')
      }
    })

    return {}
  }
})
</script>

<style></style>
