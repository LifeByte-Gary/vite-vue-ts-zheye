import { reactive, toRefs } from 'vue'

interface Loader {
  loading: boolean
  loaded: boolean
  error: any
  response: any
}

const useLoader = async (request: Promise<any>) => {
  const loader = reactive<Loader>({
    loading: true,
    loaded: false,
    error: null,
    response: null
  })

  try {
    loader.response = await request

    loader.loading = false
    loader.loaded = true
    loader.error = null
  } catch (error) {
    loader.loading = false
    loader.loaded = false
    loader.error = error
    loader.response = null
  }

  const { loading, loaded, response, error } = toRefs(loader)
  return { loading, loaded, response, error }
}

export default useLoader
