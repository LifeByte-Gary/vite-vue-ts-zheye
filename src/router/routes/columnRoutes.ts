import { RouteRecordRaw } from 'vue-router'

const columnRoutes: Array<RouteRecordRaw> = [
  {
    path: '/columns/:id',
    name: 'columns.show',
    component: () => import('@/views/modules/column/ColumnDetailPage.vue')
  }
]

export default columnRoutes
