interface AppConfig {
  name: string
  mode: string
  dev: boolean
  prod: boolean
  baseUrl: string
}

const app: Readonly<AppConfig> = {
  // App name.
  name: import.meta.env.VITE_APP_NAME,

  // App current mode (running environment).
  mode: import.meta.env.VITE_APP_MODE.trim(),

  // Whether the app is running in production.
  prod: import.meta.env.PROD,

  // Whether the app is running in development (always the opposite of import.meta.env.PROD)
  dev: import.meta.env.DEV,

  // The base url the app is being served from. This is determined by the base config option.
  baseUrl: import.meta.env.BASE_URL.trim()
}

export default app
