import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'

// Define typings for the store state.
export interface State {
  count: number
}

// Define injection key.
export const key: InjectionKey<Store<State>> = Symbol('injection key')

// Define default store state.
const defaultState: State = {
  count: 0
}

// Create store.
export const store = createStore({
  state() {
    return defaultState
  },
  mutations: {},
  actions: {},
  getters: {}
})

// Simplifying usage of useStore() composition function.
export function useStore() {
  return baseUseStore(key)
}
