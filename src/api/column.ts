import { apiRequests as api } from '@/utils/http'

const getColumnList = async (currentPage?: number, pageSize?: number) => {
  return api.get(`/columns`, { params: { currentPage, pageSize } })
}

const getColumnDetail = async (id: string) => {
  const response = await api.get(`/columns/${id}`)

  return response.data?.data
}

export default {
  getColumnList,
  getColumnDetail
}
