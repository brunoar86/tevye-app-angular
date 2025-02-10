import { Component } from '@angular/core';

interface JournalEntry {
  date: string;
  debitAccount: string;
  creditAccount: string;
  history: string;
  value: number;
}

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent {
  journalEntries: JournalEntry[] = [
    { date: '2024-01-05', debitAccount: 'Banco do Brasil', creditAccount: 'Fornecedor X', history: 'Pagamento de fornecedor', value: 500 },
    { date: '2024-01-10', debitAccount: 'Caixa', creditAccount: 'Receita de Vendas', history: 'Venda de produto', value: 1500 },
    { date: '2024-02-01', debitAccount: 'Despesas Gerais', creditAccount: 'Banco Itaú', history: 'Pagamento de aluguel', value: 1000 },
    { date: '2024-02-15', debitAccount: 'Banco Itaú', creditAccount: 'Salário', history: 'Recebimento de salário', value: 3000 },
    { date: '2024-03-01', debitAccount: 'Entretenimento', creditAccount: 'Banco do Brasil', history: 'Assinatura Netflix', value: 50 }
  ]; // Exemplo de transações

  constructor() {}
}
