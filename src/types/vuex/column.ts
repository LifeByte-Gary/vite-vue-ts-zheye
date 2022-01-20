/**
 *  Define Vuex types of module: column.
 */
import { Column, Columns } from '@/types/modules/column'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState } from '@/types/vuex/root'

export interface ColumnState {
  columnList: Columns
  currentColumn: Column | undefined
}

export interface ColumnGetterTree extends GetterTree<ColumnState, RootState> {
  getColumnById: (state: ColumnState) => (id: string) => Column | undefined
}

export interface ColumnMutationTree extends MutationTree<ColumnState> {
  setColumnList: (state: ColumnState, newColumn: Columns) => void
}

export interface ColumnActionTree extends ActionTree<ColumnState, RootState> {
  fetchColumnList: ({ commit }: ActionContext<ColumnState, RootState>) => Promise<void>
}
