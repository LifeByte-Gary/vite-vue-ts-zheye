export interface ApiService {
  description?: string
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  url: string
  function: Function
}

export type ApiServices = ApiService[]
