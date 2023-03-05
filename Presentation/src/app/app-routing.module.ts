import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './pages/books/books.component';
import { ClientsComponent } from './pages/clients/clients.component';

const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  {
    path: 'clients',
    component: ClientsComponent,
  },
  {
    path: 'books',
    component: BooksComponent,
  },
  { path: '**', redirectTo: '/clients' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
