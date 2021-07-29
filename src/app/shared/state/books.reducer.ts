import { createReducer, on, Action, createSelector, createFeatureSelector } from "@ngrx/store";
import { BookModel, calculateBooksGrossEarnings } from "src/app/shared/models";
import { BooksPageActions, BooksApiActions } from "src/app/books/actions";
import { state } from "@angular/animations";

const createBook = (books: BookModel[], book: BookModel) => [...books, book];

const updateBook = (books: BookModel[], changes: BookModel) => {
  return books.map(book => {
    return book.id === changes.id ? Object.assign({}, book, changes) : book;
  })
};

const deleteBook = (books: BookModel[], bookId: string) => 
  books.filter(book => book.id !== bookId);

export interface State {
  collection: BookModel[];
  activeBookId: string | null;
};

export const initialState: State = {
  collection: [],
  activeBookId: null
};

// const selectAll = createFeatureSelector<BookModel[]>('collection');
export const selectAll = (state: State) => state.collection;

export const selectActiveBookId = (state: State) => state.activeBookId;

export const selectActiveBook = createSelector(
  selectAll,
  selectActiveBookId,
  (books, activeBookId) => { 
    return books.find(book => book.id === activeBookId);
  }
);

export const selectEarningTotals = createSelector(
  selectAll,
  (books) => calculateBooksGrossEarnings(books)
);

export const booksReducer = createReducer(
  initialState,
  on(BooksPageActions.enter, (state, action) => {
    return {
      ...state,
      activeBookId: null
    }
  }) ,
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
    return {
      ...state,
      collection: action.books
    }
  }),
  on(BooksApiActions.bookCreated, (state, action) => {
    return {
      collection: createBook(state.collection, action.book),
      activeBookId: null
    }
  }),
  on(BooksApiActions.bookUpdated, (state, action) => {
    return {
      collection: updateBook(state.collection, action.book),
      activeBookId: null
    };
  }),
  on(BooksApiActions.bookDeleted, (state, action) => {
    return {
      ...state,
      collection: deleteBook(state.collection, action.bookId)
    }
  })
);

// us function to wrap the booksReducer so that AOT can detect it
export const reducer = (state: undefined | State, action: Action) => {
  return booksReducer(state, action);
};