import { apiRequests as api } from '@/utils/http'

const getColumnPostList = async (columnId: string, currentPage?: number, pageSize?: number) => {
  return api.get(`/columns/${columnId}/posts`, { params: { currentPage, pageSize } })
}

export default {
  getColumnPostList
}
