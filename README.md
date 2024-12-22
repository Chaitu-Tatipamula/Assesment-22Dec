# Stanbic Authentication System (SAS)

## Overview
The **Stanbic Authentication System (SAS)** is a secure, modular user authentication system built with Node.js. It includes user registration, login, role-based access control, and multi-factor authentication.

---

## Features
1. **User Registration**
   - Secure passcode storage with bcrypt.
   - OTP verification for multi-factor authentication.
   - Role-based default access assignment.
   - Duplicate account prevention.

2. **User Login**
   - Session management using JWT.
   - Rate limiting to prevent brute force attacks.

3. **Role-Based Access Control**
   - Endpoint restrictions based on roles.

4. **Logging**
   - Logs user activities like registration, login, and profile access.
   - Includes IP address logging for security.

5. **Security**
   - Input validation and sanitization.
   - Enforced rate limits.
   - Secure token management and expiration.

---

## Routes
1.Register api/auth/register
2.Login api/auth/login
3.Get Profile api/users/profile

## Installation

1. Clone the repository:
   ```bash
   npm install

2. Start server:
   ```bash
   npm start

  ## Config

  .env sample
    ```bash
          PORT=3000
          MONGO_URI=mongodb://localhost:27017/sas
          JWT_SECRET=your_jwt_secret_key
