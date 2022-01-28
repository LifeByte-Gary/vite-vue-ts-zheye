import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { RootState } from '@/types/vuex/root'
import config from '@/utils/config'
import column from '@/store/modules/column.module'
import post from '@/store/modules/post.module'
import auth from '@/store/modules/auth.module'

// Define injection key.
export const key: InjectionKey<Store<RootState>> = Symbol('injection key')

// Create store.
export const store = createStore({
  modules: { auth, column, post },
  strict: config.app.dev
})

// Simplifying usage of useStore() composition function.
export function useStore() {
  return baseUseStore(key)
}
