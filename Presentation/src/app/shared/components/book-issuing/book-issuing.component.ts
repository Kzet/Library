import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { Book } from '../../models/book';
import { Client } from '../../models/client';
import { BooksService } from '../../services/books.service';
@Component({
  selector: 'book-issuing',
  templateUrl: './book-issuing.component.html',
  styleUrls: ['./book-issuing.component.scss']
})
export class BookIssuingComponent implements OnInit {
  readonly apiUrl = environment.apiUrl;

  constructor(private booksService: BooksService,
    public dialogRef: MatDialogRef<BookIssuingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book, client: Client }  ) { }

  ngOnInit(): void {
   
  }

  transfer() {
    this.booksService.transfer(this.data.client.id, this.data.book.id, this.apiUrl).subscribe();
  }
}
