import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';
import { Book } from '../../shared/models/book';
import { BooksService } from './books.service';
import { DialogBookContentComponent } from './dialog-book-content/dialog-book-content.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  readonly apiUrl = environment.apiUrl;
  displayedColumns: string[] = ['name', 'author'];

  public books: Book[];

  constructor(private booksService: BooksService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadBooks();

  }

  loadBooks() {
    this.booksService.getBooks(this.apiUrl).subscribe(
      (res) => {
        this.books = res;
      }
    );
  }

  addBook() {
    const dialogRef = this.dialog.open(DialogBookContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.loadBooks();
      }
    });
  }

}
