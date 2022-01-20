import { Post, Posts } from '@/types/modules/post'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState } from '@/types/vuex/root'

export interface PostState {
  postList: Posts
}

export interface PostGetterTree extends GetterTree<PostState, RootState> {}

export interface PostMutationTree extends MutationTree<PostState> {
  setPostList: (state: PostState, PostList: Posts) => void
  addNewPost: (state: PostState, newPost: Post) => void
}

export interface PostActionTree extends ActionTree<PostState, RootState> {
  fetchPostListByColumnId: ({ commit }: ActionContext<PostState, RootState>, columnId: string) => Promise<void>
}
