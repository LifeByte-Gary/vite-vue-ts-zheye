<template>
  <app-header></app-header>

  <div class="container">
    <router-view></router-view>
  </div>

  <app-footer></app-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '@/components/app/AppHeader.vue'
import AppFooter from '@/components/app/AppFooter.vue'

export default defineComponent({
  name: 'App',
  components: { AppHeader, AppFooter },
  setup() {
    return {}
  }
})
</script>

<style></style>
