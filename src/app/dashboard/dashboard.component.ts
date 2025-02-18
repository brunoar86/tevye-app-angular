import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';

interface BalanceSheet {
  assets: number;
  liabilities: number;
  equity: number;
}

interface IncomeStatement {
  income: number;
  expense: number;
  result: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  balanceSheet: BalanceSheet = { assets: 0, liabilities: 0, equity: 0 };
  incomeStatement: IncomeStatement = { income: 0, expense: 0, result: 0 };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBalanceSheet();
    this.fetchIncomeStatement();
  }

  fetchBalanceSheet(): void {
    this.http.get<any>('http://127.0.0.1:8000/balance_sheet').subscribe(response => {
      if (response.status === 200) {
        this.balanceSheet = response.data;
        this.updateBalanceChart();
      }
    });
  }

  fetchIncomeStatement(): void {
    this.http.get<any>('http://127.0.0.1:8000/income_statement').subscribe(response => {
      if (response.status === 200) {
        this.incomeStatement = response.data;
        this.updateIncomeChart();
      }
    });
  }

  updateBalanceChart(): void {
    const ctx = document.getElementById('balanceChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Assets', 'Liabilities', 'Equity'],
        datasets: [{
          label: 'Balance Sheet',
          data: [
            this.balanceSheet.assets,
            this.balanceSheet.liabilities,
            this.balanceSheet.equity
          ],
          backgroundColor: ['#4CAF50', '#FF5733', '#FFC107']
        }]
      }
    });
  }

  updateIncomeChart(): void {
    const ctx = document.getElementById('incomeChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Income', 'Expenses', 'Result'],
        datasets: [{
          label: 'Income Statement',
          data: [
            this.incomeStatement.income,
            this.incomeStatement.expense,
            this.incomeStatement.result
          ],
          backgroundColor: ['#4CAF50', '#FF5733', '#FFC107']
        }]
      }
    });
  }
}
