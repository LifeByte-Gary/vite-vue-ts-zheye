// App mode checking is frequently used, so we also build a function for it.
import app from '@/configs/app'
import services from '@/configs/services'

const configs = {
  app,
  services
}

export const appMode = (mode?: string): string | boolean => {
  // If there is no argument passed, return current App mode.
  // If mode argument is passed, check whether current App mode is given App mode.
  return mode ? configs.app.mode === mode : configs.app.mode
}

export default configs
