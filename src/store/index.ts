import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { Column, Columns } from '@/types/modules/column'
import { Post, Posts } from '@/types/modules/post'
import { User } from '@/types/modules/user'
import { testPosts } from '@/testData'
import api from '@/api'

// Define typings for the store state.
export interface State {
  columnList: Columns
  postList: Posts
  user: User
}

// Define injection key.
export const key: InjectionKey<Store<State>> = Symbol('injection key')

// Define default store state.
const defaultState: State = {
  columnList: [],
  postList: testPosts,
  user: { isLogin: false }
}

// Create store.
export const store = createStore({
  state() {
    return defaultState
  },
  mutations: {
    login(state: State) {
      state.user = { ...state.user, isLogin: true, name: 'Gary', id: 1, columnId: 1 }
    },
    createPost(state: State, newPost: Post) {
      state.postList.push(newPost)
    },
    fetchColumns(state, newColumns) {
      state.columnList = newColumns
    }
  },
  actions: {
    async fetchColumns(context) {
      try {
        const response = await api.column.getColumnList()
        const columnList = response?.data.data.list

        context.commit('fetchColumns', columnList)
      } catch (error) {
        context.commit('fetchColumns', [])

        throw error
      }
    }
  },
  getters: {
    getColumnById:
      (state) =>
      (id: string): Column | undefined => {
        return state.columnList.find((col) => col._id === id)
      },
    getPostsByColumnId:
      (state) =>
      (columnId: string): Posts => {
        return state.postList.filter((post) => post.columnId === columnId)
      }
  }
})

// Simplifying usage of useStore() composition function.
export function useStore() {
  return baseUseStore(key)
}
