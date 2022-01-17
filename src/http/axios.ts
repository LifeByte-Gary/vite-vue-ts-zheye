import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://apis.imooc.com/api',
  timeout: 3000,
  headers: {}
})

// Define Interceptors ...

export default instance
