import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Account } from '../models/account';
import { CreateAccountRequest } from '../models/create-account-request';
import { RegisterRequest } from '../models/register-request';
import { RegisterResponse } from '../models/register-response';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private accountApi = 'http://localhost:8081/api/accounts';
  private userApi = 'http://localhost:8081/api/users';

  constructor(private http: HttpClient) {}

  // ===========================
  // User APIs
  // ===========================

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.userApi}/register`,
      request
    );
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.userApi}/login`,
      request
    );
  }

  // ===========================
  // Account APIs
  // ===========================

  createAccount(request: CreateAccountRequest): Observable<Account> {
    return this.http.post<Account>(
      `${this.accountApi}/create`,
      request
    );
  }

  deposit(request: any): Observable<Account> {
    return this.http.post<Account>(
      `${this.accountApi}/deposit`,
      request
    );
  }

  withdraw(request: any): Observable<Account> {
    return this.http.post<Account>(
      `${this.accountApi}/withdraw`,
      request
    );
  }

transfer(request: any): Observable<Account> {

  return this.http.post<Account>(
    `${this.accountApi}/transfer`,
    request
  );

}

getTransactionHistory(accountNumber: string): Observable<any[]> {
  return this.http.get<any[]>(
    `${this.accountApi}/history/${accountNumber}`
  );
}

  getAccount(accountNumber: string) {
  return this.http.get<any>(
    `${this.accountApi}/${accountNumber}`
  );
}

}