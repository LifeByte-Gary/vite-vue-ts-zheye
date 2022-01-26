import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState } from '@/types/vuex/root'
import { User } from '@/types/modules/user'

export interface AuthState {
  isLoggedIn: boolean
  token: string | null
  currentUser: User | undefined
}

export interface AuthGetterTree extends GetterTree<AuthState, RootState> {}

export interface AuthMutationTree extends MutationTree<AuthState> {
  setToken: (authState: AuthState, token: string) => void
  setCurrentUser: (authState: AuthState, currentUser: User) => void
  login: (authState: AuthState) => void
}

export interface AuthActionTree extends ActionTree<AuthState, RootState> {
  login: ({ commit, dispatch }: ActionContext<AuthState, RootState>, payload: { email: string; password: string }) => Promise<void>
  fetchCurrentUser: ({ commit }: ActionContext<AuthState, RootState>) => Promise<void>
}
