import axios from 'axios'
import config from '@/config'

const instance = axios.create({
  baseURL: `${config.services.apiBaseUrl}${config.services.apiVersion ? `/v${config.services.apiVersion}` : ''}`,
  timeout: 3000,
  headers: {}
})

// Define Interceptors ...

export default instance
