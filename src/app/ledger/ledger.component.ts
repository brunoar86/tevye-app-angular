import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Account {
  id: number;
  name: string;
}

interface LedgerEntry {
  id: number;
  date: string;
  debitedAccount: number;
  creditedAccount: number;
  history: string;
  value: number;
}

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {
  ledgerForm!: FormGroup;
  accounts: Account[] = [];
  ledgerEntries: LedgerEntry[] = [];
  selectedAccount: Account | null = null;
  selectedAccountId: number | null = null;
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;
  accountBalance: number | null = null; // 🔹 Adicionando saldo da conta

  private API_BASE_URL = 'http://127.0.0.1:8000';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.ledgerForm = this.fb.group({
      account: ['', Validators.required]
    });
    this.fetchAccounts();
  }

  fetchAccounts() {
    this.http.get<{ status: number; message: string; data: Account[] }>(
      `${this.API_BASE_URL}/get_all_accounts`
    ).subscribe(
      response => {
        if (response.status === 200 && response.data) {
          this.accounts = response.data;
          console.log('✔ Contas carregadas:', this.accounts);
        }
      },
      error => {
        console.error('❌ Erro ao buscar contas:', error);
      }
    );
  }

  selectAccount(event: any) {
    const selectedId = event.target.value;

    if (!selectedId) {
      console.warn('⚠ Nenhuma conta foi selecionada.');
      this.selectedAccount = null;
      this.selectedAccountId = null;
      this.accountBalance = null;
      return;
    }

    this.selectedAccount = this.accounts.find(acc => acc.id === parseInt(selectedId, 10)) || null;
    this.selectedAccountId = this.selectedAccount ? this.selectedAccount.id : null;

    console.log('✔ Conta selecionada:', this.selectedAccount);

    if (this.selectedAccountId) {
      this.fetchLedgerEntries();
      this.fetchAccountBalance(); // 🔹 Buscar saldo ao selecionar conta
    }
  }

  fetchLedgerEntries() {
    if (!this.selectedAccountId) {
      this.showMessage('⚠ Select an account before searching for ledger entries.', 'error');
      return;
    }

    console.log(`📡 Buscando registros para a conta: ${this.selectedAccountId}`);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'code': this.selectedAccountId.toString()
    });

    this.http.get<{ status: number; message: string; data: any[] }>(
      `${this.API_BASE_URL}/account_ledger`,
      { headers }
    ).subscribe(
      response => {
        console.log('✔ Resposta da API:', response);

        if (response.status === 200 && response.data.length > 0) {
          this.ledgerEntries = response.data.map(entry => ({
            id: entry[0],
            date: entry[1].split(" ")[0],
            debitedAccount: entry[2],
            creditedAccount: entry[3],
            history: entry[4],
            value: entry[5]
          }));
          this.showMessage('✅ Entries loaded successfully!', 'success');
        } else {
          this.ledgerEntries = [];
          this.showMessage('⚠ No entry found for this account.', 'error');
        }
      },
      error => {
        this.showMessage('❌ Error fetching ledger entries.', 'error');
        console.error('❌ Erro ao buscar razão:', error);
      }
    );
  }

  /**
   * 🔹 Busca o saldo da conta selecionada
   */
  fetchAccountBalance() {
    if (!this.selectedAccountId) {
      this.accountBalance = null;
      return;
    }

    console.log(`📡 Buscando saldo para a conta: ${this.selectedAccountId}`);

    const headers = new HttpHeaders({
      'accept': 'application/json',
      'code': this.selectedAccountId.toString()
    });

    this.http.get<{ status: number; message: string; data: number }>(
      `${this.API_BASE_URL}/account_balance`,
      { headers }
    ).subscribe(
      response => {
        if (response.status === 200) {
          this.accountBalance = response.data;
          console.log('✔ Saldo carregado:', this.accountBalance);
        } else {
          this.accountBalance = null;
          console.warn('⚠ Não foi possível obter o saldo.');
        }
      },
      error => {
        this.accountBalance = null;
        console.error('❌ Erro ao buscar saldo:', error);
      }
    );
  }

  showMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;

    setTimeout(() => {
      this.message = null;
      this.messageType = null;
    }, 5000);
  }
}
