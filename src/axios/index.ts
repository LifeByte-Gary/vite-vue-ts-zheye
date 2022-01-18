import axios from 'axios'

const createTemplateAxiosInstance = () => {
  const instance = axios.create({
    baseURL: '',
    timeout: 3000,
    headers: {}
  })

  // Define general interceptors ...

  return instance
}

export default createTemplateAxiosInstance()
