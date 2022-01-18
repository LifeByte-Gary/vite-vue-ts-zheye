import http from '@/utils/http'

const login = (data: { username: string; password: string }) => {
  // Return post async request function directly if there is neither API-level response hendler or error handler.
  return http.post(`/login`, data)
}

export default {
  login
}
