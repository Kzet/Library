import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../../../environments/environment';
import { Book } from '../../models/book';
import { Client } from '../../models/client';
import { ClientsService } from '../../services/clients.service';
import { BookIssuingComponent } from '../book-issuing/book-issuing.component';
import { BookReturnComponent } from '../book-return/book-return.component';
@Component({
  selector: 'book-profile',
  templateUrl: './book-profile.component.html',
  styleUrls: ['./book-profile.component.scss']
})
export class BookProfileComponent implements OnInit, AfterViewInit {
  readonly apiUrl = environment.apiUrl;
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  displayedColumns: string[] = ['name', 'email'];

  nameFilter = new FormControl('');
  emailFilter = new FormControl('');
  filterValues = {
    name: '',
    email: ''
  };
  dataSource = new MatTableDataSource();

  public clients: Client[];
  public selectedClient: Client;

  constructor(private clientsService: ClientsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<BookProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book }  ) { }

  ngOnInit(): void {
    this.loadClientsByDebt();

    this.nameFilter.valueChanges
      .subscribe(
        name => {
          this.filterValues.name = name;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.emailFilter.valueChanges
      .subscribe(
        email => {
          this.filterValues.email = email;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadClientsByDebt() {
    this.clientsService.getClientsByDebt(this.apiUrl, false).subscribe(
      (res) => {
        this.clients = res;
        this.dataSource.data = this.clients;
        this.dataSource.filterPredicate = this.createFilter();
      }
    );
  }

  returnBook() {
    const dialogRef = this.dialog.open(BookReturnComponent, {
      data: {
        book: this.data.book
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.dialogRef.close(true);
      }
    });
  }

  onRow(e) {
    this.selectedClient = e;
    const dialogRef = this.dialog.open(BookIssuingComponent, {
      data: {
        book: this.data.book,
        client: e
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
        && data.email.toString().toLowerCase().indexOf(searchTerms.email.toLowerCase()) !== -1;
    }
    return filterFunction;
  }
}
