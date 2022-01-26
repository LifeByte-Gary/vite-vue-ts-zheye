import { AuthActionTree, AuthGetterTree, AuthMutationTree, AuthState } from '@/types/vuex/auth'
import { Module } from 'vuex'
import { RootState } from '@/types/vuex/root'
import api from '@/api'

const state: AuthState = {
  isLogin: false,
  token: null,
  currentUser: undefined
}

const getters: AuthGetterTree = {}

const mutations: AuthMutationTree = {
  login: (authState, token) => {
    authState.isLogin = true
    authState.token = token
    authState.currentUser = {
      _id: '5f3e86d62c56ee13bb83096c',
      email: 'gary@test.com',
      nickName: 'Gary',
      description: "Gary's description",
      avatar: 'avatar.jpg',
      column: '5f3e86d62c56ee13bb83096c',
      createdAt: '2022-01-20T04:41:58.391Z'
    }
  }
}

const actions: AuthActionTree = {
  login: async ({ commit }, payload) => {
    const response = await api.auth.login(payload)
    const { token } = response.data.data

    commit('login', token)
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
