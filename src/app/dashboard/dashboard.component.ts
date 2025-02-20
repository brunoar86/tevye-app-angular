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
  private balanceChart!: Chart;
  private incomeChart!: Chart;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBalanceSheet();
    this.fetchIncomeStatement();
  }

  fetchBalanceSheet(): void {
    this.http.get<any>('http://127.0.0.1:8000/balance_sheet').subscribe(response => {
      if (response.status === 200) {
        this.balanceSheet = response.data;
        setTimeout(() => this.updateBalanceChart(), 0); // 🔹 Garante que o gráfico renderize após atualização do DOM
      }
    });
  }

  fetchIncomeStatement(): void {
    this.http.get<any>('http://127.0.0.1:8000/income_statement').subscribe(response => {
      if (response.status === 200) {
        this.incomeStatement = response.data;
        setTimeout(() => this.updateIncomeChart(), 0);
      }
    });
  }

  updateBalanceChart(): void {
    const ctx = document.getElementById('balanceChart') as HTMLCanvasElement;
    if (this.balanceChart) this.balanceChart.destroy(); // 🔹 Evita sobreposição de gráficos

    this.balanceChart = new Chart(ctx, {
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
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  updateIncomeChart(): void {
    const ctx = document.getElementById('incomeChart') as HTMLCanvasElement;
    if (this.incomeChart) this.incomeChart.destroy();

    this.incomeChart = new Chart(ctx, {
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
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
