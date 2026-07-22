package com.bank.dto;

public class RegisterResponse {

    private String message;
    private String accountNumber;
    private String accountType;

    public RegisterResponse() {
    }

    public RegisterResponse(String message, String accountNumber, String accountType) {
        this.message = message;
        this.accountNumber = accountNumber;
        this.accountType = accountType;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }
}