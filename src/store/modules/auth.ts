import { AuthActionTree, AuthGetterTree, AuthMutationTree, AuthState } from '@/types/vuex/auth'
import { Module } from 'vuex'
import { RootState } from '@/types/vuex/root'

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
      _id: '1',
      email: 'gary@test.com',
      nickName: 'Gary',
      description: "Gary's description",
      avatar: 'avatar.jpg',
      column: 'column-1',
      createdAt: '2022-01-20T04:41:58.391Z'
    }
  }
}

const actions: AuthActionTree = {}

const module: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default module