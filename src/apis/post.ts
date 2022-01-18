import http from '@/utils/http'

const getPostList = async () => {
  return http.get(`/posts`)
}

export default {
  getPostList
}
