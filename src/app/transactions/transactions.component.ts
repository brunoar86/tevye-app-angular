import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      debtAccount: ['', Validators.required],
      creditAccount: ['', Validators.required],
      value: ['', Validators.required],
      description: ['', Validators.required],
      transactionDate: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const transaction = this.transactionForm.value;

      this.allTransactions.unshift({
        debtAccount: transaction.debtAccount,
        creditAccount: transaction.creditAccount,
        value: transaction.value,
        description: transaction.description,
        transactionDate: transaction.transactionDate
      });

      this.updateLastDebits();
      this.updateLastCredits();

      this.transactionForm.reset();
    }
  }

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

}
