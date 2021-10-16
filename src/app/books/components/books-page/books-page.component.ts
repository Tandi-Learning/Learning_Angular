import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  BookModel,
  calculateBooksGrossEarnings,
  BookRequiredProps
} from "src/app/shared/models";
import { BooksService } from "src/app/shared/services";
import { selectActiveBook, selectAllBooks, selectBooksEarningTotals, State } from "src/app/shared/state";
import { BooksApiActions, BooksPageActions } from "../../actions";

@Component({
  selector: "app-books",
  templateUrl: "./books-page.component.html",
  styleUrls: ["./books-page.component.css"]
})
export class BooksPageComponent implements OnInit {
  // books: BookModel[] = [];
  books$: Observable<BookModel[]>;
  // currentBook: BookModel | null = null;
  currentBook$: Observable<BookModel | undefined | null>;
  // total: number = 0;
  total$: Observable<number>;

  constructor(
    private store: Store<State>
    // private booksService: BooksService
  ) {
    this.total$ = this.store.select(selectBooksEarningTotals);
    this.books$ = this.store.select(selectAllBooks);
    this.currentBook$ = this.store.select(selectActiveBook);
  }

  ngOnInit() {
    this.store.dispatch(BooksPageActions.enter());

    // this.getBooks();
    // this.removeSelectedBook();
  }

  // getBooks() {
  //   this.booksService.all().subscribe(books => {

  //     this.store.dispatch(BooksApiActions.booksLoaded({ books }));

  //     // this.books = books;
  //     // this.updateTotals(books);
  //   });
  // }

  // updateTotals(books: BookModel[]) {
  //   this.total = calculateBooksGrossEarnings(books);
  // }

  onSelect(book: BookModel) {
    this.store.dispatch(BooksPageActions.selectBook({ bookId: book.id }));

    // this.currentBook = book;
  }

  onCancel() {
    this.removeSelectedBook();
  }

  removeSelectedBook() {
    this.store.dispatch(BooksPageActions.clearSelectedBook());

    // this.currentBook = null;
  }

  onSave(book: BookRequiredProps | BookModel) {
    if ("id" in book) {
      this.updateBook(book);
    } else {
      this.saveBook(book);
    }
  }

  saveBook(bookProps: BookRequiredProps) {
    this.store.dispatch(BooksPageActions.createBook({ book: bookProps }));

    // this.booksService.create(bookProps).subscribe(book => {

    //   this.store.dispatch(BooksApiActions.bookCreated({ book }));

    //   // this.getBooks();
    //   this.removeSelectedBook();
    // });
  }

  updateBook(book: BookModel) {
    this.store.dispatch(BooksPageActions.updateBook({     
      changes: book,
      bookId: book.id
    }));

    // this.booksService.update(book.id, book).subscribe(book => {

    //   this.store.dispatch(BooksApiActions.bookUpdated({ book }));

    //   // this.getBooks();
    //   this.removeSelectedBook();
    // });
  }

  onDelete(book: BookModel) {
    this.store.dispatch(BooksPageActions.deleteBook({ bookId: book.id }));

    // this.booksService.delete(book.id).subscribe(() => {

    //   this.store.dispatch(BooksApiActions.bookDeleted({ bookId: book.id }))

    //   // this.getBooks();
    //   this.removeSelectedBook();
    // });
  }
}
