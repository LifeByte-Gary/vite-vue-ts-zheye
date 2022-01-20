import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState } from '@/types/vuex/root'
import { User } from '@/types/modules/user'

export interface AuthState {
  isLogin: boolean
  token: string | null
  currentUser: User | undefined
}

export interface AuthGetterTree extends GetterTree<AuthState, RootState> {}

export interface AuthMutationTree extends MutationTree<AuthState> {
  login: (authState: AuthState, token: string) => void
}

export interface AuthActionTree extends ActionTree<AuthState, RootState> {}
