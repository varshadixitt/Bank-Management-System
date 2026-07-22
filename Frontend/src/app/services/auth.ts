import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private STORAGE_KEY = 'loggedInUser';

  login(user: LoginResponse): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

logout(): void {

  localStorage.clear();

}

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedInUser') != null;
  }

  getUser(): LoginResponse | null {

    const user = localStorage.getItem('loggedInUser');

    return user ? JSON.parse(user) : null;
  }

}