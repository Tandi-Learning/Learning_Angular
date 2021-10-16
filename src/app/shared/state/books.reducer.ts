import { createReducer, on, Action, createSelector } from "@ngrx/store";
import { BookModel, calculateBooksGrossEarnings } from "src/app/shared/models";
import { BooksPageActions, BooksApiActions } from "src/app/books/actions";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";


// const createBook = (books: BookModel[], book: BookModel) => [...books, book];

// const updateBook = (books: BookModel[], changes: BookModel) => {
//   return books.map(book => {
//     return book.id === changes.id ? Object.assign({}, book, changes) : book;
//   })
// };

// const deleteBook = (books: BookModel[], bookId: string) => 
//   books.filter(book => book.id !== bookId);


// feature state for books
// export interface State {
//   collection: BookModel[];
//   activeBookId: string | null;
// };
export interface State extends EntityState<BookModel> {
  activeBookId: string | null;
};

const adapter: EntityAdapter<BookModel> = createEntityAdapter<BookModel>();

// export const initialState: State = {
//   collection: [],
//   activeBookId: null
// };
export const initialState: State = adapter.getInitialState({
  activeBookId: null,
});


export const { selectAll, selectEntities } = adapter.getSelectors();

// const selectAll = createFeatureSelector<BookModel[]>('collection');
// export const selectAll = (state: State) => state.collection;

export const selectActiveBookId = (state: State) => state.activeBookId;

export const selectActiveBook = createSelector(
  selectEntities,
  selectActiveBookId,
  (entities, activeBookId) => { 
    return activeBookId ? entities[activeBookId] : null;
  }
);

export const selectEarningTotals = createSelector(
  selectAll,
  (books) => calculateBooksGrossEarnings(books)
);

export const booksReducer = createReducer(
  initialState,
  // on(BooksPageActions.enter, (state, action) => {
  //   return {
  //     ...state,
  //     activeBookId: null
  //   }
  // }) ,
  on(BooksPageActions.clearSelectedBook, (state, action) => {
    return {
      ...state,
      activeBookId: null
    }
  }),
  on(BooksPageActions.selectBook, (state, action) => {
    return {
      ...state,
      activeBookId: action.bookId
    }
  }),
  on(BooksApiActions.booksLoaded, (state, action) => {
    return adapter.setAll(action.books, state);
    // return {
    //   ...state,
    //   collection: action.books
    // }
  }),
  on(BooksApiActions.bookCreated, (state, action) => {
    return adapter.addOne(
      action.book,
      {
        ...state,
        activeBookId: null
      }
    )
    // return {
    //   collection: createBook(state.collection, action.book),
    //   activeBookId: null
    // }
  }),
  on(BooksApiActions.bookUpdated, (state, action) => {
    return adapter.updateOne({
      id: action.book.id,
      changes: action.book
    },
    {
      ...state,
      activeBookId: null
    })
    // return {
    //   collection: updateBook(state.collection, action.book),
    //   activeBookId: null
    // };
  }),
  on(BooksApiActions.bookDeleted, (state, action) => {
    return adapter.removeOne(action.bookId, state);
    // return {
    //   ...state,
    //   collection: deleteBook(state.collection, action.bookId)
    // }
  })
);

// us function to wrap the booksReducer so that AOT can detect it
export const reducer = (state: undefined | State, action: Action) => {
  return booksReducer(state, action);
};