import { AuthActionTree, AuthGetterTree, AuthMutationTree, AuthState } from '@/types/vuex/auth'
import { Module } from 'vuex'
import { RootState } from '@/types/vuex/root'
import api from '@/api'
import { apiAxiosInstance } from '@/utils/http'

const state: AuthState = {
  isLoggedIn: false,
  token: null,
  currentUser: undefined
}

const getters: AuthGetterTree = {}

const mutations: AuthMutationTree = {
  setToken: (authState, token) => {
    authState.isLoggedIn = true
    authState.token = token

    apiAxiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
  },
  setCurrentUser: (authState, currentUser) => {
    authState.currentUser = currentUser
  },
  login: (authState) => {
    if (authState.token && authState.currentUser) {
      authState.isLoggedIn = true
    }
  }
}

const actions: AuthActionTree = {
  login: async ({ commit, dispatch }, payload) => {
    const response = await api.auth.login(payload)
    const { token } = response.data.data

    commit('setToken', token)

    await dispatch('fetchCurrentUser')

    commit('login')
  },
  fetchCurrentUser: async ({ commit }) => {
    const response = await api.auth.fetchCurrentUser()
    const currentUser = response.data.data

    commit('setCurrentUser', currentUser)
  }
}

const module: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default module
