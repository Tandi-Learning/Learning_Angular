import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import * as fromBooks from "./books.reducer";

// store global state
export interface State {
  books: fromBooks.State  // feature state
}

export const reducers: ActionReducerMap<State> = {
  books: fromBooks.reducer
};

export const metaReducers: MetaReducer<State>[] = [];

export const selectBooksState = createFeatureSelector<fromBooks.State>('books');
// export const selectBooksState = (state: State) => state.books;

export const selectActiveBook = createSelector(
  selectBooksState,
  (state) => {
    return fromBooks.selectActiveBook(state)
  }
);

export const selectAllBooks = createSelector(
  selectBooksState,
  (state) => fromBooks.selectAll(state)
)

export const selectBooksEarningTotals = createSelector(
  selectBooksState,
  (state) => fromBooks.selectEarningTotals(state)
);
