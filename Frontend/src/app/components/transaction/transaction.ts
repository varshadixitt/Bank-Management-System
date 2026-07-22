import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth';
import { BankService } from '../../services/bank';
import { LoginResponse } from '../../models/login-response';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction.html',
  styleUrl: './transaction.css'
})
export class TransactionComponent implements OnInit {

  user!: LoginResponse;

  transactions: any[] = [];

  loading = false;

  error = '';

  showPopup = false;

  showTransactions = false;

  constructor(
    private authService: AuthService,
    private bankService: BankService
  ) {}

  ngOnInit(): void {

    const loggedUser = this.authService.getUser();

    if (!loggedUser) {
      return;
    }

    this.user = loggedUser;

  }

  openPopup() {

    this.showPopup = true;

  }

  cancelPopup() {

    this.showPopup = false;

  }

  confirmPopup() {

    this.showPopup = false;

    this.showTransactions = true;

    this.loadTransactions();

  }

  loadTransactions() {

    this.loading = true;

    this.error = '';

    this.bankService
      .getTransactionHistory(this.user.accountNumber)
      .subscribe({

        next: (data) => {

          this.transactions = data;

          this.loading = false;

        },

        error: () => {

          this.loading = false;

          this.error = 'Unable to load transactions';

        }

      });

  }

}