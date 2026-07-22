export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  hasAccount: boolean;
  accountType?: string;
  accountNumber?: string;
}