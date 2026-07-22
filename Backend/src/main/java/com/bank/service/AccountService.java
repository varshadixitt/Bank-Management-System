package com.bank.service;

import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.entity.Account;
import com.bank.entity.Transaction;
import com.bank.entity.User;
import com.bank.repository.AccountRepository;
import com.bank.repository.TransactionRepository;
import com.bank.repository.UserRepository;
import java.util.List;
@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TransactionRepository transactionRepository;
    public Account createAccount(Long userId, String accountType) {

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = optionalUser.get();

        Account account = new Account();

        account.setAccountNumber(generateAccountNumber());
        account.setAccountType(accountType);
        account.setBalance(0.0);
        account.setUser(user);

        return accountRepository.save(account);
    }
    public Account deposit(String accountNumber, Double amount) {

        Account account = accountRepository
                .findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        account.setBalance(account.getBalance() + amount);

        accountRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setAccountNumber(accountNumber);
        transaction.setType("DEPOSIT");
        transaction.setAmount(amount);
        transaction.setTransactionTime(java.time.LocalDateTime.now());

        System.out.println("Before Save");

        transactionRepository.save(transaction);

        System.out.println("After Save");

        return account;
    }
    public Account getAccount(String accountNumber) {

        return accountRepository
                .findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("Account not found"));

    }
    public Account withdraw(String accountNumber, Double amount) {

        Account account = accountRepository
                .findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (account.getBalance() < amount) {
            throw new RuntimeException("Insufficient Balance");
        }

        account.setBalance(account.getBalance() - amount);
        Transaction transaction = new Transaction();
        transaction.setAccountNumber(accountNumber);
        transaction.setType("WITHDRAW");
        transaction.setAmount(amount);
        transaction.setTransactionTime(java.time.LocalDateTime.now());

        transactionRepository.save(transaction);
        return accountRepository.save(account);
    }
    
    public Account transfer(String fromAccount, String toAccount, Double amount) {

        Account sender = accountRepository.findByAccountNumber(fromAccount)
                .orElseThrow(() -> new RuntimeException("Sender account not found"));

        Account receiver = accountRepository.findByAccountNumber(toAccount)
                .orElseThrow(() -> new RuntimeException("Receiver account not found"));

        if (sender.getBalance() < amount) {
            throw new RuntimeException("Insufficient Balance");
        }

        sender.setBalance(sender.getBalance() - amount);
        receiver.setBalance(receiver.getBalance() + amount);

        accountRepository.save(sender);
        accountRepository.save(receiver);

        Transaction senderTransaction = new Transaction();
        senderTransaction.setAccountNumber(fromAccount);
        senderTransaction.setType("TRANSFER");
        senderTransaction.setAmount(amount);
        senderTransaction.setTransactionTime(java.time.LocalDateTime.now());
        transactionRepository.save(senderTransaction);

        Transaction receiverTransaction = new Transaction();
        receiverTransaction.setAccountNumber(toAccount);
        receiverTransaction.setType("RECEIVED");
        receiverTransaction.setAmount(amount);
        receiverTransaction.setTransactionTime(java.time.LocalDateTime.now());
        transactionRepository.save(receiverTransaction);

        return sender;
    }
    private String generateAccountNumber() {
        Random random = new Random();
        return "ACC" + (100000 + random.nextInt(900000));
    }
    
    public List<Transaction> getTransactionHistory(String accountNumber) {

        return transactionRepository.findByAccountNumber(accountNumber);

    }
}