import { apiRequests as api } from '@/utils/http'

const getPostList = async () => {
  return api.get(`/posts`)
}

export default {
  getPostList
}
