import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Account } from '../../models/account';
import { BankService } from '../../services/bank';
import { AuthService } from '../../services/auth';
import { LoginResponse } from '../../models/login-response';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transfer.html',
  styleUrl: './transfer.css'
})
export class TransferComponent implements OnInit {

  user: LoginResponse | null = null;

  fromAccount = '';
  toAccount = '';
  amount: number | null = null;

  successMessage = '';
  errorMessage = '';

  constructor(
    private bankService: BankService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.user = this.authService.getUser();

    if (this.user) {
      this.fromAccount = this.user.accountNumber;
    }

  }

  transferMoney() {

    this.successMessage = '';
    this.errorMessage = '';

    if (!this.toAccount.trim()) {
      this.errorMessage = 'Enter receiver account number.';
      return;
    }

    if (this.toAccount === this.fromAccount) {
      this.errorMessage = 'Cannot transfer to the same account.';
      return;
    }

    if (this.amount == null || this.amount <= 0) {
      this.errorMessage = 'Enter a valid amount.';
      return;
    }

    const request = {
      fromAccount: this.fromAccount,
      toAccount: this.toAccount,
      amount: this.amount
    };

    this.bankService.transfer(request).subscribe({

next: (account: Account) => {

  if (this.user) {

    this.user.balance = account.balance;

    localStorage.setItem(
      'loggedInUser',
      JSON.stringify(this.user)
    );

  }

  this.successMessage = "Transfer Successful";

  this.toAccount = "";
  this.amount = null;

},

      error: (error) => {

        this.errorMessage = error.error || 'Transfer Failed';

      }

    });

  }

}