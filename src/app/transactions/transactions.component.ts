import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Account {
  id: number;
  name: string;
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactionForm!: FormGroup;
  allTransactions: any[] = [];
  lastDebits: any[] = [];
  lastCredits: any[] = [];
  accounts: Account[] = []; // 🔹 Contas carregadas do backend
  message: string | null = null; // 🔹 Mensagem para o usuário
  messageType: 'success' | 'error' | null = null; // 🔹 Define a cor da mensagem

  private API_BASE_URL = 'http://127.0.0.1:8000';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      debtAccount: ['', Validators.required],
      creditAccount: ['', Validators.required],
      value: ['', Validators.required],
      description: ['', Validators.required],
      transactionDate: ['', Validators.required]
    });

    this.fetchAccounts(); // 🔹 Busca as contas no backend
  }

  /**
   * 🔹 Busca todas as contas no banco via API
   */
  fetchAccounts() {
    this.http.get<{ status: number; message: string; data: Account[] }>(
      `${this.API_BASE_URL}/get_all_accounts`
    ).subscribe(
      response => {
        if (response.status === 200 && response.data) {
          this.accounts = response.data;
        }
      },
      error => {
        console.error('Erro ao buscar contas:', error);
      }
    );
  }

  /**
   * 🔹 Registra a transação no backend via API
   */
  onSubmit(): void {
    if (this.transactionForm.valid) {
      const transaction = this.transactionForm.value;

      const transactionPayload = {
        date: transaction.transactionDate,
        debited_account: transaction.debtAccount,
        credited_account: transaction.creditAccount,
        value: Number(transaction.value.replace(',', '.')), // Converte para número
        description: transaction.description
      };

      this.http.post<{ status: number; message: string }>(
        `${this.API_BASE_URL}/journal_entry`,
        transactionPayload
      ).subscribe(
        response => {
          if (response.status === 200) {
            this.showMessage('Transação registrada com sucesso!', 'success');

            // Adiciona a transação localmente para exibição imediata
            this.allTransactions.unshift(transaction);
            this.updateLastDebits();
            this.updateLastCredits();
          }
        },
        error => {
          this.showMessage('Erro ao registrar transação.', 'error');
          console.error('Erro ao registrar transação:', error);
        }
      );

      this.transactionForm.reset();
    }
  }

  /**
   * 🔹 Atualiza os últimos lançamentos na conta a débito
   */
  updateLastDebits(): void {
    const selectedDebtAccount = this.transactionForm.get('debtAccount')?.value;
    if (selectedDebtAccount) {
      this.lastDebits = this.allTransactions
        .filter(t => t.debtAccount === selectedDebtAccount)
        .slice(0, 5);
    } else {
      this.lastDebits = [];
    }
  }

  /**
   * 🔹 Atualiza os últimos lançamentos na conta a crédito
   */
  updateLastCredits(): void {
    const selectedCreditAccount = this.transactionForm.get('creditAccount')?.value;
    if (selectedCreditAccount) {
      this.lastCredits = this.allTransactions
        .filter(t => t.creditAccount === selectedCreditAccount)
        .slice(0, 5);
    } else {
      this.lastCredits = [];
    }
  }

  /**
   * 🔹 Exibe mensagens de status APENAS para a requisição de transação
   */
  showMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;

    // 🔹 Esconde a mensagem após 5 segundos
    setTimeout(() => {
      this.message = null;
      this.messageType = null;
    }, 5000);
  }
}
