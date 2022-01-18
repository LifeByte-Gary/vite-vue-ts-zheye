import { apiRequests as api } from '@/utils/http'

const login = (data: { username: string; password: string }) => {
  return api.post(`/login`, data)
}

export default {
  login
}
