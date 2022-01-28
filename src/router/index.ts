import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'
import { store } from '@/store'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to.meta.redirectAuthed)
  console.log(store.state.auth.isLoggedIn)
  if (to.meta.requiresAuth && !store.state.auth.isLoggedIn) {
    next({ name: 'auth.login' })
  } else if (to.meta.redirectAuthed && store.state.auth.isLoggedIn) {
    console.log(123)
    next({ name: 'app.home' })
  } else {
    next()
  }
})

export default router
