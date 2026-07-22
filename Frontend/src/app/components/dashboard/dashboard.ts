import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';
import { BankService } from '../../services/bank';
import { LoginResponse } from '../../models/login-response';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  user: LoginResponse | null = null;
  transactions: any[] = [];

  constructor(
    private authService: AuthService,
    private bankService: BankService
  ) {}

  ngOnInit(): void {

    this.user = this.authService.getUser();

    if (!this.user) {
      return;
    }

    this.loadAccount();

    this.loadTransactions();

  }

  loadAccount(): void {

    if (!this.user) {
      return;
    }

    this.bankService.getAccount(this.user.accountNumber)
      .subscribe({

        next: (account) => {

          if (!this.user) {
            return;
          }

          this.user = {
            ...this.user,
            balance: account.balance,
            accountType: account.accountType
          };

          // Update latest user in localStorage
          localStorage.setItem(
            'loggedInUser',
            JSON.stringify(this.user)
          );

        },

        error: (error) => {
          console.error('Error loading account:', error);
        }

      });

  }

  loadTransactions(): void {

    if (!this.user) {
      return;
    }

    this.bankService.getTransactionHistory(this.user.accountNumber)
      .subscribe({

        next: (data) => {

          this.transactions = data.slice(0, 5);

        },

        error: (error) => {

          console.error('Error loading transactions:', error);

        }

      });

  }

}