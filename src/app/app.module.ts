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
import { LedgerComponent } from './ledger/ledger.component';
import { JournalComponent } from './journal/journal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    TransactionsComponent,
    AccountsComponent,
    AccountsCreateComponent,
    AccountsDeleteComponent,
    AccountsAlterComponent,
    LedgerComponent,
    JournalComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
