<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between px-4">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand" href="#">知乎专栏</router-link>
      <ul v-if="!user.isLogin" class="list-inline mb-0">
        <li class="list-inline-item">
          <router-link :to="{ name: 'auth.login' }" class="btn btn-outline-light my-2">登陆</router-link>
        </li>
        <li class="list-inline-item">
          <router-link :to="{ name: 'auth.login' }" class="btn btn-outline-light my-2">注册</router-link>
        </li>
      </ul>
      <ul v-else class="list-inline mb-0">
        <li class="list-inline-item">
          <base-dropdown :title="`Hello ${user.name}`">
            <base-dropdown-item>
              <router-link :to="{ name: 'posts.create' }" class="dropdown-item">新建文章</router-link>
            </base-dropdown-item>
            <base-dropdown-item disabled>
              <a href="#" class="dropdown-item">编辑资料</a>
            </base-dropdown-item>
            <base-dropdown-item>
              <a href="#" class="dropdown-item">退出登陆</a>
            </base-dropdown-item>
          </base-dropdown>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { User } from '@/types/modules/user'
import BaseDropdown from '@/components/base/BaseDropdown.vue'
import BaseDropdownItem from '@/components/base/BaseDropdownItem.vue'

export default defineComponent({
  name: 'TheHeader',
  components: { BaseDropdownItem, BaseDropdown },
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  }
})
</script>

<style scoped></style>
