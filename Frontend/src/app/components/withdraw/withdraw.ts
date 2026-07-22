import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BankService } from '../../services/bank';
import { AuthService } from '../../services/auth';
import { LoginResponse } from '../../models/login-response';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './withdraw.html',
  styleUrl: './withdraw.css'
})
export class WithdrawComponent implements OnInit {

  user: LoginResponse | null = null;

  accountNumber='';

  amount:number|null=null;

  successMessage='';

  errorMessage='';

  constructor(
    private bankService:BankService,
    private authService:AuthService
  ){}

  ngOnInit(){

    this.user=this.authService.getUser();

    if(this.user){

      this.accountNumber=this.user.accountNumber;

    }

  }

  withdrawMoney(){

    this.successMessage='';

    this.errorMessage='';

    if(this.amount==null||this.amount<=0){

      this.errorMessage="Enter valid amount.";

      return;

    }

    const request={

      accountNumber:this.accountNumber,

      amount:this.amount

    };

    this.bankService.withdraw(request).subscribe({

      next:(account)=>{

        if(this.user){

          this.user = {
  ...this.user,
  balance: account.balance ?? 0
};

          localStorage.setItem(
            "loggedInUser",
            JSON.stringify(this.user)
          );

        }

        this.successMessage="Withdrawal Successful";

        this.amount=null;

      },

      error:(err)=>{

        console.log(err);

        this.errorMessage="Withdrawal Failed";

      }

    });

  }

}