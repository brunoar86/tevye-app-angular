import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Account {
  id: number;
  name: string;
}

@Component({
  selector: 'app-accounts-alter',
  templateUrl: './accounts-alter.component.html',
  styleUrls: ['./accounts-alter.component.css']
})
export class AccountsAlterComponent implements OnInit {
  alterForm: FormGroup;
  accounts: Account[] = [];
  selectedAccount: Account | null = null;
  message: string | null = null; // 🔹 Mensagem para o usuário
  messageType: 'success' | 'error' | null = null; // 🔹 Define a cor da mensagem

  private API_BASE_URL = 'http://127.0.0.1:8000';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.alterForm = this.fb.group({
      account: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    this.fetchAccounts();
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
   * 🔹 Atualiza o campo de nome ao selecionar uma conta
   */
  onSelectAccount() {
    const selectedId = parseInt(this.alterForm.value.account, 10);
    this.selectedAccount = this.accounts.find(acc => acc.id === selectedId) || null;

    if (this.selectedAccount) {
      this.alterForm.patchValue({ name: this.selectedAccount.name });
    }
  }

  /**
   * 🔹 Atualiza o nome da conta via API
   */
  updateAccount() {
    if (this.alterForm.valid && this.selectedAccount) {
      const updatedName = this.alterForm.value.name;

      const updatePayload = {
        id: this.selectedAccount.id,
        account_name: updatedName
      };

      this.http.patch<{ status: number; message: string }>(
        `${this.API_BASE_URL}/update_account`,
        updatePayload
      ).subscribe(
        response => {
          if (response.status === 200) {
            this.showMessage('Conta atualizada com sucesso!', 'success');
            this.fetchAccounts(); // Atualiza a lista após a alteração
            this.alterForm.reset();
            this.selectedAccount = null;
          }
        },
        error => {
          this.showMessage('Erro ao atualizar conta.', 'error');
          console.error('Erro ao atualizar conta:', error);
        }
      );
    }
  }

  /**
   * 🔹 Exibe mensagens de status APENAS para a atualização de conta
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
