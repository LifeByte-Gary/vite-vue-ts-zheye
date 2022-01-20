import { ColumnActionTree, ColumnGetterTree, ColumnMutationTree, ColumnState } from '@/types/vuex/column'
import { Module } from 'vuex'
import { RootState } from '@/types/vuex/root'
import api from '@/api'
import defaultAvatar from '@/assets/column.jpg'

const state: ColumnState = {
  columnList: [],
  currentColumn: undefined
}

const getters: ColumnGetterTree = {
  getColumnById: (columnState) => (id: string) => {
    return columnState.columnList.find((col) => col._id === id)
  }
}

const mutations: ColumnMutationTree = {
  setColumnList: (columnState, newColumnList) => {
    columnState.columnList = newColumnList.map((column) => {
      column.avatar = {
        ...column.avatar,
        url: `${column.avatar.url}?x-oss-process=image/resize,m_pad,h_50,w_50` ?? defaultAvatar
      }
      return column
    })
  }
}

const actions: ColumnActionTree = {
  fetchColumnList: async ({ commit }) => {
    const response = await api.column.getColumnList()
    const columnList = response?.data.data.list

    commit('setColumnList', columnList)
  }
}

const module: Module<ColumnState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default module
