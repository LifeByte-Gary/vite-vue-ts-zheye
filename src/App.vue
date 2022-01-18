<template>
  <app-header :user="currentUser"></app-header>

  <div class="container">
    <router-view></router-view>
  </div>

  <app-footer></app-footer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import AppHeader from '@/components/app/AppHeader.vue'
import AppFooter from '@/components/app/AppFooter.vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'App',
  components: { AppHeader, AppFooter },
  setup() {
    const store = useStore()

    const currentUser = computed(() => {
      return store.state.user
    })
    return {
      currentUser
    }
  }
})
</script>

<style></style>
