package com.bank.service;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bank.dto.LoginResponse;
import com.bank.dto.RegisterRequest;
import com.bank.dto.RegisterResponse;
import com.bank.entity.Account;
import com.bank.entity.User;
import com.bank.exception.AccountNotFoundException;
import com.bank.exception.EmailAlreadyExistsException;
import com.bank.exception.InvalidPasswordException;
import com.bank.exception.UserNotFoundException;
import com.bank.repository.AccountRepository;
import com.bank.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register User
    public RegisterResponse registerUser(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email already registered.");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());

        // Encrypt password
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(user);

        String accountNumber;
        String accountType;

        if (Boolean.FALSE.equals(request.getHasAccount())) {

            Account account = new Account();

            accountNumber = generateAccountNumber();
            accountType = request.getAccountType();

            account.setAccountNumber(accountNumber);
            account.setAccountType(accountType);
            account.setBalance(0.0);
            account.setUser(savedUser);

            accountRepository.save(account);

        } else {

            Account account = accountRepository
                    .findByAccountNumber(request.getAccountNumber())
                    .orElseThrow(() ->
                            new AccountNotFoundException("Account not found."));

            account.setUser(savedUser);
            accountRepository.save(account);

            accountNumber = account.getAccountNumber();
            accountType = account.getAccountType();
        }

        return new RegisterResponse(
                "Registration Successful",
                accountNumber,
                accountType
        );
    }

    // Login User
    public LoginResponse loginUser(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found."));

        // Compare encrypted password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new InvalidPasswordException("Invalid password.");
        }

        // Fetch account mapped to the user
        Account account = accountRepository.findByUser(user)
                .orElseThrow(() ->
                        new AccountNotFoundException("Account not found."));

        return new LoginResponse(
                "Login Successful",
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                account.getAccountNumber(),
                account.getAccountType(),
                account.getBalance()
        );
    }

    // Generate Account Number
    private String generateAccountNumber() {

        Random random = new Random();

        return "ACC" + (100000 + random.nextInt(900000));
    }

}