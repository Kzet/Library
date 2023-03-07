import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';
import { BookProfileComponent } from '../../shared/components/book-profile/book-profile.component';
import { Book } from '../../shared/models/book';
import { BooksService } from '../../shared/services/books.service';
import { DialogBookContentComponent } from './dialog-book-content/dialog-book-content.component';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Genre } from '../../shared/models/genre';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, AfterViewInit {
  readonly apiUrl = environment.apiUrl;
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  displayedColumns: string[] = ['name', 'author', 'genre', 'available'];
  availableValues = [
    {
      name: "В наличии",
      available: true
    },
    {
      name: "У клиента",
      available: false
    }
  ];

  nameFilter = new FormControl('');
  authorFilter = new FormControl('');
  genreFilter = new FormControl('');
  availableFilter = new FormControl('');
  filterValues = {
    name: '',
    author: '',
    genre: null,
    available: null
  };

  dataSource = new MatTableDataSource();

  public books: Book[];
  public genres: Genre[];

  constructor(private booksService: BooksService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadBooks();
    this.loadGenres();

    this.nameFilter.valueChanges
      .subscribe(
        name => {
          this.filterValues.name = name;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.authorFilter.valueChanges
      .subscribe(
        author => {
          this.filterValues.author = author;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.genreFilter.valueChanges
      .subscribe(
        genre => {
          this.filterValues.genre = genre;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.availableFilter.valueChanges
      .subscribe(
        available => {
          this.filterValues.available = available;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadBooks() {
    this.booksService.getBooks(this.apiUrl).subscribe(
      (res) => {
        this.books = res;
        this.dataSource.data = this.books;
        this.dataSource.filterPredicate = this.createFilter();
      }
    );
  }

  loadGenres() {
    this.booksService.getGenres(this.apiUrl).subscribe((res) => {
      this.genres = res;
    });
  }

  addBook() {
    const dialogRef = this.dialog.open(DialogBookContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.loadBooks();
      }
    });
  }

  onRow(e) {
    const dialogRef = this.dialog.open(BookProfileComponent, {
      data: { book: e },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.loadBooks();
      }
    });
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name.toLowerCase()) !== -1
        && data.author.toString().toLowerCase().indexOf(searchTerms.author.toLowerCase()) !== -1
        && (searchTerms.genre == null || searchTerms.genre != null && data.genreId == searchTerms.genre)
        && (typeof searchTerms.available === 'undefined' || searchTerms.available == null || (data.dateReturn == null) == searchTerms.available);
    }
    return filterFunction;
  }

}
