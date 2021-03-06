import axios from '@/axios'
import { AxiosRequestConfig } from 'axios'
import config from '@/utils/config'

/**
 * Create project-level HTTP client.
 */

// Create project-level axios instance.
const httpAxiosInstance = axios

// Define project-level HTTP requests.
const httpGet = async (url: string, configs?: AxiosRequestConfig) => {
  return httpAxiosInstance.get(url, configs)
}

const httpPost = async (url: string, data?: any, configs?: AxiosRequestConfig) => {
  // Return Axios post request directly if you have neither global response nor error handler.
  return httpAxiosInstance.post(url, data, configs)
}

const httpPut = async (url: string, data?: any, configs?: AxiosRequestConfig) => {
  return httpAxiosInstance.put(url, data, configs)
}

const httpPatch = async (url: string, data?: any, configs?: AxiosRequestConfig) => {
  return httpAxiosInstance.patch(url, data, configs)
}

const httpDelete = async (url: string, configs?: AxiosRequestConfig) => {
  return httpAxiosInstance.delete(url, configs)
}

const httpRequests = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  patch: httpPatch,
  delete: httpDelete
}

export default httpRequests

/**
 * Create API-level HTTP client.
 */

// Create API-level axios instance.
const apiAxiosInstance = axios

// Config api axios instance.
apiAxiosInstance.defaults.baseURL = `${config.services.apiBaseUrl}${config.services.apiVersion ? `/v${config.services.apiVersion}` : ''}`

// Define API-level HTTP requests.
const apiGet = async (url: string, configs?: AxiosRequestConfig) => {
  return httpRequests.get(url, configs)
}

const apiPost = async (url: string, data?: any, configs?: AxiosRequestConfig) => {
  // Return Axios post request directly if you have neither global response nor error handler.
  return httpRequests.post(url, data, configs)
}

const apiPut = async (url: string, data?: any, configs?: AxiosRequestConfig) => {
  return httpRequests.put(url, data, configs)
}

const apiPatch = async (url: string, data?: any, configs?: AxiosRequestConfig) => {
  return httpRequests.patch(url, data, configs)
}

const apiDelete = async (url: string, configs?: AxiosRequestConfig) => {
  return httpRequests.delete(url, configs)
}

export const apiRequests = {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  patch: apiPatch,
  delete: apiDelete
}
