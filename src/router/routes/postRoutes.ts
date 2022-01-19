import { RouteRecordRaw } from 'vue-router'

const postRoutes: Array<RouteRecordRaw> = [
  {
    path: '/post/create',
    name: 'posts.create',
    component: () => import('@/views/modules/post/PostCreatePage.vue'),
    meta: { requiresAuth: true }
  }
]

export default postRoutes