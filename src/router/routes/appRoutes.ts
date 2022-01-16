import { RouteRecordRaw } from 'vue-router'

const appRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'app.home',
    component: () => import('@/views/app/HomePage.vue')
  }
]

export default appRoutes
