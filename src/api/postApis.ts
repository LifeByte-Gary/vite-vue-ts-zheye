import http from '@/http'
import { ApiServices } from '@/types/plugins/api'

const getPostList = async () => {
  return http.get(`/posts`)
}

export const postServices: ApiServices = [
  {
    description: 'Get the list of post',
    url: `/posts`,
    method: 'get',
    function: getPostList
  }
]

export default {
  getPostList
}
