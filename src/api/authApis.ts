import http from '@/http'
import { ApiServices } from '@/types/plugins/api'

const login = (data: { username: string; password: string }) => {
  // Return post async request function directly if there is neither API-level response hendler or error handler.
  return http.post(`/login`, data)
}

export const authServices: ApiServices = [
  {
    description: 'Login user by username and password',
    url: `/login`,
    method: 'post',
    function: login
  }
]

export default {
  login
}
