import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsModule } from './pages/clients/clients.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BooksModule } from './pages/books/books.module';
import { BookProfileModule } from './shared/components/book-profile/book-profile.module';
import { BookIssuingModule } from './shared/components/book-issuing/book-issuing.module';
import { BookReturnModule } from './shared/components/book-return/book-return.module';
import { ClientProfileModule } from './shared/components/client-profile/client-profile.module';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientsModule,
    BooksModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BookProfileModule,
    BookIssuingModule,
    BookReturnModule,
    ClientProfileModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
