import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AccountsComponent } from './accounts/accounts/accounts.component';
import { AccountsCreateComponent } from './accounts/accounts-create/accounts-create.component';
import { AccountsDeleteComponent } from './accounts/accounts-delete/accounts-delete.component';
import { AccountsAlterComponent } from './accounts/accounts-alter/accounts-alter.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    TransactionsComponent,
    AccountsComponent,
    AccountsCreateComponent,
    AccountsDeleteComponent,
    AccountsAlterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
