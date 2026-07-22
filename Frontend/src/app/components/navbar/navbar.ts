import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';
import { LoginResponse } from '../../models/login-response';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  showMenu = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get user(): LoginResponse | null {
    return this.authService.getUser();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  goToProfile() {
    this.showMenu = false;
    this.router.navigate(['/profile']);
  }

  logout() {
    this.showMenu = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}