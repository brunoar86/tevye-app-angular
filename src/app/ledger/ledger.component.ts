import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Account {
  code: string;
  name: string;
  group: string;
  type: string; // 'D' (Débito) ou 'C' (Crédito)
}

interface LedgerEntry {
  date: string;
  counterpart: string;
  history: string;
  debit: number;
  credit: number;
  balance: number;
}

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent {
  ledgerForm: FormGroup;
  accounts: Account[] = [
    { code: '112001', name: 'Banco do Brasil', group: '112', type: 'D' },
    { code: '112002', name: 'Itaú', group: '112', type: 'D' },
    { code: '114001', name: 'Estoque Loja A', group: '114', type: 'D' },
    { code: '311001', name: 'Netflix', group: '311', type: 'D' },
    { code: '412001', name: 'Venda Produto X', group: '412', type: 'C' }
  ]; // Exemplo de contas cadastradas

  ledgerEntries: LedgerEntry[] = [];
  selectedAccount: Account | null = null;

  // Dados fictícios para exemplificar os lançamentos contábeis
  allLedgerEntries: { [key: string]: LedgerEntry[] } = {
    '112001': [
      { date: '2024-01-05', counterpart: 'Itaú', history: 'Transferência recebida', debit: 2000, credit: 0, balance: 2000 },
      { date: '2024-01-10', counterpart: 'Fornecedor X', history: 'Pagamento de fornecedor', debit: 0, credit: 500, balance: 1500 }
    ],
    '112002': [
      { date: '2024-02-01', counterpart: 'Banco do Brasil', history: 'Transferência enviada', debit: 0, credit: 1000, balance: -1000 },
      { date: '2024-02-15', counterpart: 'Salário', history: 'Depósito de salário', debit: 3000, credit: 0, balance: 2000 }
    ],
    '311001': [
      { date: '2024-03-01', counterpart: 'Banco do Brasil', history: 'Pagamento Netflix', debit: 50, credit: 0, balance: -50 }
    ]
  };

  constructor(private fb: FormBuilder) {
    this.ledgerForm = this.fb.group({
      account: ['', Validators.required]
    });
  }

  onSelectAccount() {
    const selectedCode = this.ledgerForm.value.account;
    this.selectedAccount = this.accounts.find(acc => acc.code === selectedCode) || null;
    this.ledgerEntries = this.allLedgerEntries[selectedCode] || [];
  }
}
