import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BankService } from '../../services/bank';
import { RegisterRequest } from '../../models/register-request';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  request: RegisterRequest = {
    fullName: '',
    email: '',
    password: '',
    hasAccount: false,
    accountType: 'Savings',
    accountNumber: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(private bankService: BankService) {}

  register() {

    this.successMessage = '';
    this.errorMessage = '';

    this.bankService.register(this.request).subscribe({

      next: () => {

        this.successMessage = 'Registration Successful!';
        this.resetForm();

      },

      error: (error) => {

        this.errorMessage = error.error;

      }

    });

  }

  resetForm() {

    this.request = {
      fullName: '',
      email: '',
      password: '',
      hasAccount: false,
      accountType: 'Savings',
      accountNumber: ''
    };

  }

}