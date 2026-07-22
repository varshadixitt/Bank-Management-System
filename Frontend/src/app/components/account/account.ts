import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BankService } from '../../services/bank';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class AccountComponent {

  userId: number = 1;
  accountType: string = 'SAVINGS';

  constructor(private bankService: BankService) {}

  createAccount() {

    const request = {
      userId: this.userId,
      accountType: this.accountType
    };

    this.bankService.createAccount(request).subscribe({

      next: (response) => {
        console.log(response);
        alert('Account Created Successfully!');
      },

      error: (error) => {
        console.error(error);
        alert('Account Creation Failed!');
      }

    });

  }
}