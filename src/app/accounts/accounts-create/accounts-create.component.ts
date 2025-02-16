import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Account {
  id: number;
  name: string;
}

interface AccountGroup {
  id: number;
  name: string;
}

@Component({
  selector: 'app-accounts-create',
  templateUrl: './accounts-create.component.html',
  styleUrls: ['./accounts-create.component.css']
})
export class AccountsCreateComponent implements OnInit {
  accountForm: FormGroup;
  accounts: Account[] = []; // Contas do grupo selecionado
  groups: AccountGroup[] = [];
  selectedGroupId: number | null = null;
  message: string | null = null; // 🔹 Mensagem para o usuário
  messageType: 'success' | 'error' | null = null; // 🔹 Define a cor da mensagem

  private API_BASE_URL = 'http://127.0.0.1:8000';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.accountForm = this.fb.group({
      group: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    this.fetchAccountGroups();
  }

  /**
   * 🔹 Busca os grupos de contas do banco via API
   */
  fetchAccountGroups() {
    this.http.get<{ status: number; message: string; data: AccountGroup[] }>(
      `${this.API_BASE_URL}/get_account_groups`
    ).subscribe(
      response => {
        if (response.status === 200 && response.data) {
          this.groups = response.data;
        }
      },
      error => {
        console.error('Error fetching control accounts:', error);
      }
    );
  }

  /**
   * 🔹 Atualiza a lista de contas ao selecionar um grupo
   */
  onGroupChange() {
    const groupId = parseInt(this.accountForm.value.group, 10);
    this.selectedGroupId = groupId;
    this.fetchAccountsByGroup(groupId);
  }

  /**
   * 🔹 Busca as contas existentes para um grupo via API
   */
  fetchAccountsByGroup(groupId: number) {
    const headers = new HttpHeaders({ 'group-id': groupId.toString() });

    this.http.get<{ status: number; message: string; data: Account[] }>(
      `${this.API_BASE_URL}/get_accounts_by_group`, { headers }
    ).subscribe(
      response => {
        if (response.status === 200 && response.data) {
          this.accounts = response.data;
        } else {
          this.accounts = [];
        }
      },
      error => {
        console.error('Error fetching accounts:', error);
      }
    );
  }

  /**
   * 🔹 Cria uma conta e envia para o banco via API
   */
  createAccount() {
    if (this.accountForm.valid) {
      const { group, name } = this.accountForm.value;
      const groupId = parseInt(group, 10);
      const selectedGroup = this.groups.find(g => g.id === groupId);

      if (selectedGroup) {
        const newAccountPayload = {
          group_id: groupId,
          account_name: name
        };

        this.http.post<{ status: number; message: string }>(
          `${this.API_BASE_URL}/create_account`,
          newAccountPayload
        ).subscribe(
          response => {
            if (response.status === 200) {
              this.showMessage('Account created!', 'success');
              this.fetchAccountsByGroup(groupId); // Atualiza a lista de contas após a criação
              this.accountForm.reset();
              this.selectedGroupId = null;
            }
          },
          error => {
            this.showMessage('Error creating account.', 'error');
            console.error('Erro ao criar conta:', error);
          }
        );
      }
    }
  }

  /**
   * 🔹 Exibe mensagens de status APENAS para a criação de conta
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
