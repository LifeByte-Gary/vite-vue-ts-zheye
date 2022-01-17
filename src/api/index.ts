import authApis, { authServices } from '@/api/authApis'
import postApis, { postServices } from '@/api/postApis'

// A list of all API services details.
const services = [...authServices, ...postServices]

const requests = {
  auth: authApis,
  post: postApis
}

// Define more configs

// Define a composition function for Vue components.
export const useApi = () => {
  return requests
}

export default {
  requests,
  services
  // export more configs
}
