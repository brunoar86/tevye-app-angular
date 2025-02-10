import { Component } from '@angular/core';

interface BalanceSheet {
  assets: number;
  liabilities: number;
  equity: number;
}

interface IncomeStatement {
  revenue: number;
  expenses: number;
  netIncome: number;
}

interface CashFlow {
  operating: number;
  investing: number;
  financing: number;
  netCashFlow: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  balanceSheet: BalanceSheet = {
    assets: 50000,
    liabilities: 20000,
    equity: 30000
  };

  incomeStatement: IncomeStatement = {
    revenue: 100000,
    expenses: 60000,
    netIncome: 40000
  };

  cashFlow: CashFlow = {
    operating: 25000,
    investing: -10000,
    financing: 5000,
    netCashFlow: 20000
  };

  constructor() {}
}
