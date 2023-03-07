import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../../environments/environment';
import { ClientProfileComponent } from '../../shared/components/client-profile/client-profile.component';
import { Client } from '../../shared/models/client';
import { ClientsService } from '../../shared/services/clients.service';
import { DialogContentComponent } from './dialog-content/dialog-content.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, AfterViewInit {
  readonly apiUrl = environment.apiUrl;
  @ViewChild('paginator') paginator: any = MatPaginator;
  @ViewChild('paginatorDebtors') paginatorDebtors: any = MatPaginator;
  displayedColumns: string[] = ['name', 'email'];

  nameFilter = new FormControl('');
  emailFilter = new FormControl('');
  filterValues = {
    name: '',
    email: ''
  };
  dataSource = new MatTableDataSource();

  nameDebtorsFilter = new FormControl('');
  emailDebtorsFilter = new FormControl('');
  filterDebtorsValues = {
    name: '',
    email: ''
  };
  dataSourceDebtors = new MatTableDataSource();

  public clients: Client[];
  public debtors: Client[];

  constructor(private clientsService: ClientsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadClients();
    this.loadDebtors();

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

    this.nameDebtorsFilter.valueChanges
      .subscribe(
        name => {
          this.filterDebtorsValues.name = name;
          this.dataSourceDebtors.filter = JSON.stringify(this.filterDebtorsValues);
        }
      )
    this.emailDebtorsFilter.valueChanges
      .subscribe(
        email => {
          this.filterDebtorsValues.email = email;
          this.dataSourceDebtors.filter = JSON.stringify(this.filterDebtorsValues);
        }
      )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceDebtors.paginator = this.paginatorDebtors;
  }

  loadClients() {
    this.clientsService.getClients(this.apiUrl).subscribe(
      (res) => {
        this.clients = res;
        this.dataSource.data = this.clients;
        this.dataSource.filterPredicate = this.createFilter();
      }
    );
  }

  loadDebtors() {
    this.clientsService.getClientsByDebt(this.apiUrl, true).subscribe(
      (res) => {
        this.debtors = res;
        this.dataSourceDebtors.data = this.debtors;
        this.dataSourceDebtors.filterPredicate = this.createFilter();
      }
    );
  }

  addUser() {
    const dialogRef = this.dialog.open(DialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.loadClients();
        this.loadDebtors();
      }
    });
  }

  onRow(e) {
    const dialogRef = this.dialog.open(ClientProfileComponent, {
      data: { client: e }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.loadClients();
        this.loadDebtors();
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
