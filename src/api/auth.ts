import { apiRequests as api } from '@/utils/http'

const login = (data: { email: string; password: string }) => {
  return api.post(`/user/login`, data)
}

export default {
  login
}
