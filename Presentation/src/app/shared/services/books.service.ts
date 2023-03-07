import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { Genre } from '../models/genre';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) { }

  getBooks(apiUrl: string): Observable<Book[]> {
    return this.http.get<Book[]>(apiUrl + '/books/getBooks');
  }
  getAvailableBooks(apiUrl: string): Observable<Book[]> {
    return this.http.get<Book[]>(apiUrl + '/books/getAvailableBooks');
  }

  getGenres(apiUrl: string): Observable<Genre[]> {
    return this.http.get<Genre[]>(apiUrl + '/books/getGenres');
  }

  addBook(
    book: Book,
    apiUrl: string
  ) {
    return this.http.post(apiUrl + '/books/addBook', book);
  }

  getBookById(apiUrl: string, id: number): Observable<Book> {
    return this.http.get<Book>(apiUrl + '/books/getBookById', {
      params: {
        id: id
      }
    });
  }

  getBooksByClientId(apiUrl: string, clientId: number): Observable<Book[]> {
    return this.http.get<Book[]>(apiUrl + '/books/getBooksByClientId', {
      params: {
        clientId: clientId
      }
    });
  }

  transfer(
    clientId: number,
    bookId: number,
    apiUrl: string
  ) {

    return this.http.post(apiUrl + '/books/transfer', {
        clientId: clientId,
        bookId: bookId
    });
  }

  returnBook(
    bookId: number,
    apiUrl: string
  ) {

    return this.http.post(apiUrl + '/books/returnBook', {
        bookId: bookId
    });
  }
}
