# 🏦 Bank Management System

A full-stack Bank Management System developed using **Spring Boot**, **Angular**, and **MySQL**. This application allows users to register, log in securely, manage bank accounts, and perform banking operations such as deposits, withdrawals, fund transfers, and profile management.

---

## 🚀 Features

### Authentication
- User Registration
- Secure Login
- Password Encryption using BCrypt
- Logout

### Banking Operations
- Create Bank Account
- View Account Details
- Deposit Money
- Withdraw Money
- Transfer Funds
- View User Profile

### Security
- Spring Security
- BCrypt Password Hashing
- REST API Validation
- Global Exception Handling

---

## 🛠️ Tech Stack

### Frontend
- Angular
- TypeScript
- HTML
- CSS
- Bootstrap

### Backend
- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- Maven

### Database
- MySQL

### Tools
- Git
- GitHub
- Eclipse IDE
- Visual Studio Code
- Postman (for API testing)

---

## 📂 Project Structure

```
Bank-Management-System
│
├── Backend
│   ├── src
│   ├── pom.xml
│   └── ...
│
└── Frontend
    ├── src
    ├── angular.json
    ├── package.json
    └── ...
```

---

## 📸 Application Modules

- Home Page
- User Registration
- Login
- Dashboard
- Create Account
- Deposit
- Withdraw
- Transfer
- Profile
- Transaction History

---

## ⚙️ Backend Setup

1. Clone the repository

```bash
git clone https://github.com/varshadixitt/Bank-Management-System.git
```

2. Open the Backend project.

3. Configure MySQL in `application.properties`.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bank_management
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

4. Run the Spring Boot application.

Backend runs on:

```
http://localhost:8081
```

---

## 💻 Frontend Setup

Navigate to the Frontend folder.

Install dependencies:

```bash
npm install
```

Run Angular:

```bash
ng serve
```

Application URL:

```
http://localhost:4200
```

---

## 📡 REST APIs

### User APIs

- Register User
- Login User

### Account APIs

- Create Account
- Get Account Details
- Deposit Money
- Withdraw Money
- Transfer Money

---

## 🧱 Architecture

```
Angular UI
      │
      ▼
REST APIs
      │
      ▼
Spring Boot
      │
      ▼
Service Layer
      │
      ▼
Repository Layer (JPA)
      │
      ▼
MySQL Database
```

---

## 🔐 Security Features

- BCrypt Password Encryption
- Secure Login
- Exception Handling
- Input Validation

---

## 🌟 Future Enhancements

- Transaction History
- Email Notifications
- Password Reset
- Account Statement Download
- JWT Authentication
- Admin Dashboard

---

## 👩‍💻 Author

**Varsha Dixit**

GitHub:
https://github.com/varshadixitt

---

## ⭐ If you like this project

Please consider giving it a ⭐ on GitHub.
