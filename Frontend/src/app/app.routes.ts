import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

import { HomeComponent } from './components/home/home';
import { AccountComponent } from './components/account/account';
import { DepositComponent } from './components/deposit/deposit';
import { WithdrawComponent } from './components/withdraw/withdraw';
import { TransferComponent } from './components/transfer/transfer';
import { TransactionComponent } from './components/transaction/transaction';
import { RegisterComponent } from './components/register/register';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ProfileComponent } from './components/profile/profile';


export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  {
    path: 'account',
    component: AccountComponent,
    canActivate: [authGuard]
  },

  {
    path: 'deposit',
    component: DepositComponent,
    canActivate: [authGuard]
  },

  {
    path: 'withdraw',
    component: WithdrawComponent,
    canActivate: [authGuard]
  },

  {
    path: 'transfer',
    component: TransferComponent,
    canActivate: [authGuard]
  },

  {
    path: 'transaction',
    component: TransactionComponent,
    canActivate: [authGuard]
  },

  {
  path: 'profile',
  component: ProfileComponent,
  canActivate: [authGuard]
},

{
    path: '**',
    redirectTo: ''
  },

];