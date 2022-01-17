import axios from '@/http/axios'
import { AxiosRequestConfig } from 'axios'

const get = async (url: string, configs?: AxiosRequestConfig) => {
  return axios.get(url, configs)
}

const post = async (url: string, data?: any, configs?: AxiosRequestConfig) => {
  // Return Axios post request directly if you have neither global response nor error handler.
  return axios.post(url, data, configs)
}

export default {
  get,
  post
}
