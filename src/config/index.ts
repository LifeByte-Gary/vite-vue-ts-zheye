import app from '@/config/app'
import services from '@/config/services'

const configs = {
  app,
  services
}

// Define useConfig() composition function for Vue components.
export const useConfig = () => {
  return configs
}

// App mode checking is frequently used, so we also build a function for it.
export const appMode = (mode?: string): string | boolean => {
  // If there is no argument passed, return current App mode.
  // If mode argument is passed, check whether current App mode is given App mode.
  return mode ? configs.app.mode === mode : configs.app.mode
}

export default configs
