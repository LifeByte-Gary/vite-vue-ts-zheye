import { RouteRecordRaw } from 'vue-router'

const appRoute: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'app.home',
    component: () => import('@/views/app/HomePage.vue')
  }
]

export default appRoute
