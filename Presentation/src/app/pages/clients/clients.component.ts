import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';
import { Client } from '../../shared/models/client';
import { ClientsService } from './clients.service';
import { DialogContentComponent } from './dialog-content/dialog-content.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  readonly apiUrl = environment.apiUrl;
  displayedColumns: string[] = ['name', 'email'];

  public clients: Client[];

  constructor(private clientsService: ClientsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientsService.getClients(this.apiUrl).subscribe(
      (res) => {
        this.clients = res;
      }
    );
  }

  addUser() {
    const dialogRef = this.dialog.open(DialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.loadClients();
      }
    });
  }

}
