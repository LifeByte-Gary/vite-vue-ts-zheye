import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { RootState } from '@/types/vuex/root'
import config from '@/utils/config'
import column from '@/store/modules/column.module'
import post from '@/store/modules/post.module'
import auth from '@/store/modules/auth.module'

// Define typings for the store state.
// export interface State {
//   postList: Posts
//   user: User
// }

// Define injection key.
export const key: InjectionKey<Store<RootState>> = Symbol('injection key')

// Define default store state.
// const defaultState: State = {
//   postList: testPosts,
//   user: { isLogin: false }
// }

// Create store.
export const store = createStore({
  // state() {
  //   return defaultState
  // },
  // mutations: {
  //   login(state: State) {
  //     state.user = { ...state.user, isLogin: true, name: 'Gary', id: 1, columnId: 1 }
  //   },
  //   createPost(state: State, newPost: Post) {
  //     state.postList.push(newPost)
  //   },
  //   fetchColumns(state, newColumns) {
  //     state.columnList = newColumns
  //   }
  // },
  // actions: {
  //   async fetchColumns(context) {
  //     try {
  //       const response = await api.column.getColumnList()
  //       const columnList = response?.data.data.list
  //
  //       context.commit('fetchColumns', columnList)
  //     } catch (error) {
  //       context.commit('fetchColumns', [])
  //
  //       throw error
  //     }
  //   }
  // },
  // getters: {
  //   getPostsByColumnId:
  //     (state) =>
  //     (columnId: string): Posts => {
  //       return state.postList.filter((post) => post.columnId === columnId)
  //     }
  // }
  modules: { auth, column, post },
  strict: config.app.dev
})

// Simplifying usage of useStore() composition function.
export function useStore() {
  return baseUseStore(key)
}
