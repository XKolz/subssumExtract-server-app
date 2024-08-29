**LIVE URL**
https://subssumextract-server-app.onrender.com/

**POSTMAN DOCUMENTATION**
https://documenter.getpostman.com/view/23652017/2sAXjKZBwv

Here’s a comprehensive README for your project, including the functionalities and API endpoints:

---

# Project README

## Overview

This project is a web application with authentication, user management, and wallet functionality. Users can register, log in, manage their profiles, and perform various transactions such as converting airtime to cash and managing wallet funds. Admins have additional capabilities to manage user accounts and view transaction history.

## Features

- User Authentication
- Profile Management
- Wallet Funding
- Airtime Conversion
- Transaction History
- Admin Functions

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
   **Repo Setup**
    ```
    mkdir my-express-app
    cd my-express-app
    npm init -y
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

    ```bash
    npm install express
    npm install express bcryptjs jsonwebtoken mongoose dotenv
    npm install passport passport-google-oauth20 express-session
    npm install nodemailer
    npm install multer
   ```

3. **Create a `.env` file in the root directory and add your environment variables:**

   ```env
    PORT=
    MONGO_URI=
    JWT_SECRET=key_secret
    SUPPRESS_NO_CONFIG_WARNING=true
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    EMAIL_USER=
    EMAIL_PASS=
   ```

4. **Start the server:**

   ```bash
   npm start
   ```

## API Endpoints

### User Authentication

- **POST /api/auth/register**
  - Registers a new user.
  - **Request Body:**
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "token": "jwt-token",
      "user": {
        "id": "user-id",
        "username": "string",
        "email": "string"
      }
    }
    ```

- **POST /api/auth/login**
  - Logs in an existing user.
  - **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "token": "jwt-token"
    }
    ```

- **POST /api/auth/google**
  - Google authentication login.
  - Redirects to Google login page.

### Profile Management

- **GET /api/profile**
  - Retrieves the current user's profile.
  - **Response:**
    ```json
    {
      "id": "user-id",
      "username": "string",
      "email": "string",
      "status": "active"
    }
    ```

- **POST /api/profile/upload-profile-picture**
  - Uploads a profile picture.
  - **Form Data:**
    - `profilePicture` (file)
  - **Response:**
    ```json
    {
      "msg": "Profile picture uploaded successfully"
    }
    ```

- **POST /api/profile/edit**
  - Edits user profile details.
  - **Request Body:**
    ```json
    {
      "username": "string",
      "email": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "msg": "Profile updated successfully"
    }
    ```

### Wallet Management

- **POST /api/fund**
  - Funds the user's wallet.
  - **Request Body:**
    ```json
    {
      "amount": "number"
    }
    ```
  - **Response:**
    ```json
    {
      "msg": "Wallet funded successfully",
      "balance": "number"
    }
    ```

### Airtime Conversion

- **POST /api/convert-airtime**
  - Converts airtime to cash.
  - **Request Body:**
    ```json
    {
      "network": "string",
      "phoneNumber": "string",
      "amount": "number",
      "pin": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "success": true,
      "message": "Airtime converted successfully",
      "amount": "number"
    }
    ```

### Transaction History

- **GET /api/transactions**
  - Retrieves the transaction history for the logged-in user.
  - **Query Parameters:**
    - `page` (optional, for pagination)
    - `limit` (optional, for pagination)
  - **Response:**
    ```json
    [
      {
        "service": "string",
        "amount": "number",
        "totalAmount": "number",
        "status": "string",
        "paymentMethod": "string",
        "transactionNo": "string",
        "date": "ISODate"
      }
    ]
    ```

### Admin Functions

    **Create the admin**
    node scripts/createAdmin.js

- **POST /api/admin/login**
  - Admin login.
  - **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "token": "jwt-token"
    }
    ```

- **POST /api/admin/update-user-status/:userId**
  - Updates the status of a user.
  - **Request Body:**
    ```json
    {
      "status": "active" // or "inactive"
    }
    ```
  - **Response:**
    ```json
    {
      "msg": "User status updated successfully"
    }
    ```

## Testing

To test the APIs, you can use tools like Postman or cURL. Ensure you provide the appropriate authentication tokens where required.

---

Feel free to modify or add more details to this README as needed.
