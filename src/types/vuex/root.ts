/**
 *  Define Vuex root types.
 */
import { ColumnState } from '@/types/vuex/column'
import { PostState } from '@/types/vuex/post'
import { AuthState } from '@/types/vuex/auth'

export interface RootState {
  auth: AuthState
  column: ColumnState
  post: PostState
}
