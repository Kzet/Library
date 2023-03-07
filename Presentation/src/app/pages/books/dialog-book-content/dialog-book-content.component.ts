import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { Book } from '../../../shared/models/book';
import { Genre } from '../../../shared/models/genre';
import { BooksService } from '../../../shared/services/books.service';
@Component({
  selector: 'app-book-dialog-content',
  templateUrl: './dialog-book-content.component.html',
  styleUrls: ['./dialog-book-content.component.scss']
})
export class DialogBookContentComponent implements OnInit {
  readonly apiUrl = environment.apiUrl;
  public book: Book = new Book();
  public genres: Genre[];

  booksForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    genreId: new FormControl('', [Validators.required]),
  });

  get register() { return this.booksForm.controls; }

  constructor(private fb: FormBuilder,
    private booksService: BooksService,
    public dialogRef: MatDialogRef<DialogBookContentComponent>) { }

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres() {
    this.booksService.getGenres(this.apiUrl).subscribe((res) => {
      this.genres = res;
    });
  }

  onSubmit() {
    if (this.booksForm.valid) {
      this.book.author = this.register['author'].value;
      this.book.name = this.register['name'].value;
      this.book.genreId = this.register['genreId'].value;
      this.book.available = true;
      this.booksService
        .addBook(this.book, this.apiUrl)
        .subscribe((res: any) => {
          this.dialogRef.close(true);
        })
    }
    
  }

}
