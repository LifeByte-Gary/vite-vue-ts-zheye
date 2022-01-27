import { RouteRecordRaw } from 'vue-router'

const authRoute: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'auth.login',
    component: () => import('@/views/auth/LoginPage.vue'),
    meta: { redirectAuthed: true, requiresAuth: false }
  }
]

export default authRoute
