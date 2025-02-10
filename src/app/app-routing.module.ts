import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from './transactions/transactions.component';
import { AccountsComponent } from './accounts/accounts/accounts.component';
import { AccountsAlterComponent } from './accounts/accounts-alter/accounts-alter.component';
import { AccountsCreateComponent } from './accounts/accounts-create/accounts-create.component';
import { AccountsDeleteComponent } from './accounts/accounts-delete/accounts-delete.component';
import { LedgerComponent } from './ledger/ledger.component';
import { JournalComponent } from './journal/journal.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'transactions', component: TransactionsComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'account-alter', component: AccountsAlterComponent },
  { path: 'account-create', component: AccountsCreateComponent },
  { path: 'account-delete', component: AccountsDeleteComponent },
  { path: 'ledger', component: LedgerComponent },
  { path: 'journal', component: JournalComponent },
  { path: 'dashboard', component: DashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
