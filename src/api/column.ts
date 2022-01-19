import { apiRequests as api } from '@/utils/http'

const getColumnList = async (currentPage?: number, pageSize?: number) => {
  return api.get(`/columns`, { params: { currentPage, pageSize } })
}

export default {
  getColumnList
}
