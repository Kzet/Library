import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { Book } from '../../models/book';
import { BooksService } from '../../services/books.service';
@Component({
  selector: 'book-return',
  templateUrl: './book-return.component.html',
  styleUrls: ['./book-return.component.scss']
})
export class BookReturnComponent implements OnInit {
  readonly apiUrl = environment.apiUrl;

  constructor(private booksService: BooksService,
    public dialogRef: MatDialogRef<BookReturnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book }  ) { }

  ngOnInit(): void {
  }

  returnBook() {
    this.booksService.returnBook(this.data.book.id, this.apiUrl).subscribe((res) => {

    });
  }
}
