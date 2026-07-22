import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BankService } from '../../services/bank';
import { AuthService } from '../../services/auth';
import { LoginResponse } from '../../models/login-response';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './deposit.html',
  styleUrl: './deposit.css'
})
export class DepositComponent implements OnInit {

  user: LoginResponse | null = null;

  accountNumber = '';

  amount: number | null = null;

  successMessage = '';
  errorMessage = '';

  constructor(
    private bankService: BankService,
    private authService: AuthService
  ) {}

ngOnInit(): void {

  this.user = this.authService.getUser();

  console.log("Logged in user:", this.user);

  if (this.user) {
    this.accountNumber = this.user.accountNumber;
    console.log("Account Number:", this.accountNumber);
  }

}
depositMoney() {

  console.log("Deposit button clicked");

  this.successMessage = '';
  this.errorMessage = '';

  if (this.amount == null || this.amount <= 0) {
    this.errorMessage = 'Please enter a valid amount.';
    return;
  }

  const request = {
    accountNumber: this.accountNumber,
    amount: this.amount
  };

  console.log("Sending request:", request);

  this.bankService.deposit(request).subscribe({

    next: (response) => {
      console.log("SUCCESS:", response);

      this.successMessage = '₹' + this.amount + ' deposited successfully.';
      this.amount = null;
    },

    error: (err) => {
      console.log("ERROR:", err);
      this.errorMessage = 'Deposit failed.';
    }

  });

}

}