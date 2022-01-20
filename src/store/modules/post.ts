import { PostActionTree, PostGetterTree, PostMutationTree, PostState } from '@/types/vuex/post'
import { Module } from 'vuex'
import { RootState } from '@/types/vuex/root'
import api from '@/api'

const state: PostState = {
  postList: []
}

const getters: PostGetterTree = {}

const mutations: PostMutationTree = {
  setPostList: (postState, postList) => {
    postState.postList = postList
  },
  addNewPost: (postState, newPost) => {
    postState.postList.push(newPost)
  }
}

const actions: PostActionTree = {
  fetchPostListByColumnId: async ({ commit }, columnId: string) => {
    const response = await api.post.getColumnPostList(columnId)
    const columnPosts = response.data?.data?.list

    commit('setPostList', columnPosts)
  }
}

const module: Module<PostState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default module
