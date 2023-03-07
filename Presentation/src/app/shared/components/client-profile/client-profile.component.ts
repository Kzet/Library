import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../../../environments/environment';
import { Book } from '../../models/book';
import { Client } from '../../models/client';
import { Genre } from '../../models/genre';
import { BooksService } from '../../services/books.service';
import { BookIssuingComponent } from '../book-issuing/book-issuing.component';
import { BookReturnComponent } from '../book-return/book-return.component';
@Component({
  selector: 'client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit, AfterViewInit {
  readonly apiUrl = environment.apiUrl;
  @ViewChild('paginator') paginator: any = MatPaginator;
  @ViewChild('paginatorAv') paginatorAv: any = MatPaginator;
  displayedColumns: string[] = ['name', 'dateReturn'];
  displayedAvailableColumns: string[] = ['name', 'author', 'genre'];

  dataSource = new MatTableDataSource();
  dataSourceAv = new MatTableDataSource();

  nameFilter = new FormControl('');
  authorFilter = new FormControl('');
  genreFilter = new FormControl('');
  filterValues = {
    name: '',
    author: '',
    genre: null
  };

  public books: Book[];
  public genres: Genre[];
  public availableBooks: Book[];
  public isDebtor: boolean = true;
  public returnMode: boolean = true;
  public selectedBook: Book;

  constructor(private booksService: BooksService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ClientProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { client: Client }  ) { }

  ngOnInit(): void {
    this.loadBooksByClientId();
    this.loadAvailableBooks();
    this.loadGenres();

    this.nameFilter.valueChanges
      .subscribe(
        name => {
          this.filterValues.name = name;
          this.dataSourceAv.filter = JSON.stringify(this.filterValues);
        }
      )
    this.authorFilter.valueChanges
      .subscribe(
        author => {
          this.filterValues.author = author;
          this.dataSourceAv.filter = JSON.stringify(this.filterValues);
        }
      )
    this.genreFilter.valueChanges
      .subscribe(
        genre => {
          this.filterValues.genre = genre;
          this.dataSourceAv.filter = JSON.stringify(this.filterValues);
        }
      )
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceAv.paginator = this.paginatorAv;
  }

  loadBooksByClientId() {
    this.booksService.getBooksByClientId(this.apiUrl, this.data.client.id).subscribe(
      (res) => {
        var now = new Date();
        this.books = res;
        this.dataSource.data = this.books;
        if (res.length == 0) {
          this.isDebtor = false;
        }
        else {
          let newArr = res.filter((it) => {return new Date(it.dateReturn) < now });
          if (newArr.length == 0) {
            this.isDebtor = false;
          }
        }
      });
  }

  loadAvailableBooks() {
    this.booksService.getAvailableBooks(this.apiUrl).subscribe(
      (res) => {
        this.availableBooks = res;
        this.dataSourceAv.data = this.availableBooks;
        this.dataSourceAv.filterPredicate = this.createFilter();
      });
  }

  loadGenres() {
    this.booksService.getGenres(this.apiUrl).subscribe((res) => {
      this.genres = res;
    });
  }

  editmode() {
    if (this.isDebtor) {
      this.returnMode = true;
    }
    else {
      this.returnMode = !this.returnMode;
    }
  }

  onRow(e) {
    const dialogRef = this.dialog.open(BookReturnComponent, {
      data: {
        book: e
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.dialogRef.close(true);
      }
    });
  }

  onAvailableBook(e) {
    
    this.selectedBook = e;
    const dialogRef = this.dialog.open(BookIssuingComponent, {
      data: {
        book: e,
        client: this.data.client
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.dialogRef.close(true);
      }
    });
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name.toLowerCase()) !== -1
        && data.author.toString().toLowerCase().indexOf(searchTerms.author.toLowerCase()) !== -1
        && (searchTerms.genre == null || searchTerms.genre != null && data.genreId == searchTerms.genre);
    }
    return filterFunction;
  }
}
