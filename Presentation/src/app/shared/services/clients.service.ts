import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) { }

  getClients(apiUrl: string): Observable<Client[]> {
    return this.http.get<Client[]>(apiUrl + '/clients/getClients');
  }

  getClientsByDebt(apiUrl: string, isDebtor: boolean): Observable<Client[]> {
    return this.http.get<Client[]>(apiUrl + '/clients/getClientsByDebt', {
      params: {
        isDebtor: isDebtor
      }
    });
  }

  registerClient(
    client: Client,
    apiUrl: string
  ) {
    return this.http.post(apiUrl + '/clients/registerClient', client);
  }

}
