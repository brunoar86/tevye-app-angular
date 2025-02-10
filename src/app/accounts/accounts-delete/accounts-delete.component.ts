import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Account {
  id: number;
  name: string;
}

@Component({
  selector: 'app-accounts-delete',
  templateUrl: './accounts-delete.component.html',
  styleUrls: ['./accounts-delete.component.css']
})
export class AccountsDeleteComponent implements OnInit {
  deleteForm: FormGroup;
  accounts: Account[] = [];
  message: string | null = null; // 🔹 Mensagem para o usuário
  messageType: 'success' | 'error' | null = null; // 🔹 Define a cor da mensagem

  private API_BASE_URL = 'http://127.0.0.1:8000';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.deleteForm = this.fb.group({
      account: ['', Validators.required]
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
   * 🔹 Exclui uma conta via API e atualiza a lista
   */
  deleteAccount() {
    const selectedId = parseInt(this.deleteForm.value.account, 10);

    this.http.delete<{ status: number; message: string }>(
      `${this.API_BASE_URL}/delete_account`,
      {
        body: { id: selectedId }, // 🔹 Enviar o ID da conta no corpo da requisição
        headers: { 'Content-Type': 'application/json' }
      }
    ).subscribe(
      response => {
        if (response.status === 200) {
          this.showMessage('Conta excluída com sucesso!', 'success');
          this.fetchAccounts(); // Atualiza a lista após a exclusão
        }
      },
      error => {
        this.showMessage('Erro ao excluir conta.', 'error');
        console.error('Erro ao excluir conta:', error);
      }
    );

    this.deleteForm.reset();
  }

  /**
   * 🔹 Exibe mensagens de status APENAS para a exclusão de conta
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
