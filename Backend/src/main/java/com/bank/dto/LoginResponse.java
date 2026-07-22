package com.bank.dto;

public class LoginResponse {

    private String message;
    private Long id;
    private String fullName;
    private String email;
    private String accountNumber;
    private String accountType;
    private Double balance;

    public LoginResponse() {
    }

    public LoginResponse(String message,
                         Long id,
                         String fullName,
                         String email,
                         String accountNumber,
                         String accountType,
                         Double balance) {

        this.message = message;
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.balance = balance;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }
}