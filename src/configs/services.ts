interface servicesConfigs {
  apiBaseUrl: string
  apiVersion: number
  apiIcode: string
}

const services: Readonly<servicesConfigs> = {
  // Back end API server settings.
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL.trim(),
  apiVersion: +import.meta.env.VITE_API_VERSION,
  apiIcode: import.meta.env.VITE_API_ICODE.trim()
}

export default services
