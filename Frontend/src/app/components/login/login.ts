import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { LoginRequest } from '../../models/login-request';
import { LoginResponse } from '../../models/login-response';

import { BankService } from '../../services/bank';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  loginRequest: LoginRequest = {
    email: '',
    password: ''
  };

  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(
    private bankService: BankService,
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {

    this.successMessage = '';
    this.errorMessage = '';
    this.loading = true;

    this.bankService.login(this.loginRequest).subscribe({

      next: (response: LoginResponse) => {

        this.authService.login(response);

        this.successMessage = response.message;

        this.loading = false;

        setTimeout(() => {

          this.router.navigate(['/dashboard']);

        },1000);

      },

      error: (error) => {

        this.loading = false;

        this.errorMessage =
          error.error || 'Login Failed';

      }

    });

  }

}