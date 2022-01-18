import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'
import { store } from '@/store'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.isLogin) {
    next({ name: 'auth.login' })
  } else if (to.meta.redirectAuthed && store.state.user.isLogin) {
    next({ name: 'app.home' })
  } else {
    next()
  }
})

export default router
