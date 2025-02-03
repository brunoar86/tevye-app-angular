import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactionForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      transactionType: ['', Validators.required],
      item: ['', Validators.required],
      paymentMethod: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      console.log('Transação registrada:', this.transactionForm.value);
  }
}
}

