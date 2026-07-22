package com.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bank.dto.CreateAccountRequest;
import com.bank.dto.DepositRequest;
import com.bank.dto.TransferRequest;
import com.bank.dto.WithdrawRequest;
import com.bank.entity.Account;
import com.bank.service.AccountService;
import java.util.List;
import com.bank.entity.Transaction;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/create")
    public Account createAccount(@RequestBody CreateAccountRequest request) {

        return accountService.createAccount(
                request.getUserId(),
                request.getAccountType());

    }
    

@PostMapping("/deposit")
public Account deposit(@RequestBody DepositRequest request) {

    return accountService.deposit(
            request.getAccountNumber(),
            request.getAmount());

}

@PostMapping("/withdraw")
public Account withdraw(@RequestBody WithdrawRequest request) {

    return accountService.withdraw(
            request.getAccountNumber(),
            request.getAmount());
}

@PostMapping("/transfer")
public Account transfer(@RequestBody TransferRequest request) {

    return accountService.transfer(
            request.getFromAccount(),
            request.getToAccount(),
            request.getAmount());

}

@GetMapping("/history/{accountNumber}")
public List<Transaction> getTransactionHistory(
        @PathVariable String accountNumber) {

    return accountService.getTransactionHistory(accountNumber);

}

@GetMapping("/{accountNumber}")
public Account getAccount(@PathVariable String accountNumber) {

    return accountService.getAccount(accountNumber);

}
}
