import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../shared/models/book';
import { Genre } from '../../shared/models/genre';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) { }

  getBooks(apiUrl: string): Observable<Book[]> {
    return this.http.get<Book[]>(apiUrl + '/books/getBooks');
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
}
