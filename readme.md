# QR Code Generator and Event Tracker API

## Overview

This project is a backend application that allows users to generate static and dynamic QR codes, track events for QR code scans, and manage the QR codes they own. The application is built using **Node.js**, **Express**, and **MongoDB**, with features like user authentication, QR code management, and event tracking.

## Features

- **User Authentication**: Secure login and user management with JWT tokens.
- **Static QR Code Generation**: Generate static QR codes linked to a URL.
- **Dynamic QR Code Generation**: Create dynamic QR codes that can be updated with a new URL.
- **Event Tracking**: Track events like device and location each time a QR code is scanned.
- **User-specific QR Codes**: Each user can generate and manage their own QR codes.

## Technologies Used

- **Node.js** (Backend)
- **Express.js** (Web framework)
- **MongoDB** (Database)
- **Mongoose** (ODM for MongoDB)
- **JWT** (Authentication)
- **QRCode Library** (QR Code Generation)
- **Bcryptjs** (Password Hashing)
- **Jest** (Testing Framework)
- **Supertest** (API Testing)
- **Swagger** (API Documentation)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repository-url.git
   ```

2. Install dependencies:

   ```bash
   cd your-repository
   npm install
   ```

3. Set up environment variables (in `.env` file):

   ```env
   JWT_SECRET=your-secret-key
   MONGO_URI=your-mongodb-uri
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

5. The application will be running at `http://localhost:5000`.

## API Documentation

### Swagger API Documentation

You can access the Swagger-generated API documentation by visiting the following URL:

```
http://localhost:5000/api-docs
```

Swagger provides a user-friendly interface to explore all the available endpoints, request/response formats, and authentication details.

### Authentication

#### **Login**

- **POST** `/api/auth/login`

  **Request Body**:
  ```json
  {
    "username": "user123",
    "password": "yourPassword"
  }
  ```

  **Response**:
  - **200 OK**: If credentials are valid, returns a JWT token.
    ```json
    {
      "token": "jwt-token-here"
    }
    ```
  - **401 Unauthorized**: If credentials are invalid.
    ```json
    {
      "message": "Invalid credentials."
    }
    ```

#### **Get Current User**

- **GET** `/api/auth/me`

  **Headers**:
  - `Authorization`: `Bearer <JWT_TOKEN>`

  **Response**:
  - **200 OK**: Returns the current user's details.
    ```json
    {
      "user": {
        "username": "user123",
        "email": "user@example.com"
      }
    }
    ```
  - **401 Unauthorized**: If the user is not authenticated.
    ```json
    {
      "message": "Access token is missing"
    }
    ```

---

### QR Code Generation

#### **Generate Static QR Code**

- **POST** `/api/qr/generate-static`

  **Headers**:
  - `Authorization`: `Bearer <JWT_TOKEN>`

  **Request Body**:
  ```json
  {
    "url": "https://example.com",
    "metadata": {
      "name": "Sample QR Code"
    }
  }
  ```

  **Response**:
  - **201 Created**: Returns the created QR code.
    ```json
    {
      "qrCode": {
        "_id": "qrCodeId",
        "url": "https://example.com",
        "metadata": {
          "name": "Sample QR Code"
        },
        "qrCodeImage": "data:image/png;base64,..."
      }
    }
    ```

---

#### **Generate Dynamic QR Code**

- **POST** `/api/qr/generate`

  **Headers**:
  - `Authorization`: `Bearer <JWT_TOKEN>`

  **Request Body**:
  ```json
  {
    "initialUrl": "https://initial-url.com"
  }
  ```

  **Response**:
  - **201 Created**: Returns the generated dynamic QR code and its ID.
    ```json
    {
      "qrCodeImage": "data:image/png;base64,...",
      "dynamicId": "dynamicId123"
    }
    ```

---

#### **Update Dynamic QR Code**

- **PUT** `/api/qr/update/:id`

  **Headers**:
  - `Authorization`: `Bearer <JWT_TOKEN>`

  **Request Body**:
  ```json
  {
    "newUrl": "https://new-url.com"
  }
  ```

  **Response**:
  - **200 OK**: If the update is successful.
    ```json
    {
      "message": "QR Code updated successfully."
    }
    ```
  - **404 Not Found**: If QR code not found.
    ```json
    {
      "message": "QR Code not found."
    }
    ```

---

#### **Track Event**

- **POST** `/api/qr/track/:id`

  **Headers**:
  - `Authorization`: `Bearer <JWT_TOKEN>`

  **Request Body**:
  ```json
  {
    "location": "New York",
    "device": "iPhone 12",
    "metadata": {
      "eventType": "scan"
    }
  }
  ```

  **Response**:
  - **201 Created**: If event is tracked successfully.
    ```json
    {
      "event": {
        "qrCodeId": "qrCodeId",
        "location": "New York",
        "device": "iPhone 12",
        "metadata": {
          "eventType": "scan"
        }
      }
    }
    ```

---

#### **Get User's QR Codes**

- **GET** `/api/qr/my`

  **Headers**:
  - `Authorization`: `Bearer <JWT_TOKEN>`

  **Response**:
  - **200 OK**: Returns a list of the user's QR codes.
    ```json
    {
      "qrCodes": [
        {
          "_id": "qrCodeId",
          "url": "https://example.com",
          "metadata": {
            "name": "Sample QR Code"
          }
        }
      ]
    }
    ```
  - **404 Not Found**: If no QR codes found for the user.
    ```json
    {
      "message": "No QR Codes found."
    }
    ```

## Testing

### Jest & Supertest

Testing is set up using **Jest** as the testing framework, with **Supertest** for API testing. The tests cover various scenarios like user login, QR code generation, and event tracking.

To run the tests, use the following command:

```bash
npm run test
```

This will run all the tests in the `tests` folder.

### Test Files

- **auth.test.js**: Tests related to authentication (login, current user details).
- **qr.test.js**: Tests related to QR code generation, updating, and event tracking.

### Example Test

Here is an example of a test using Jest and Supertest for the login endpoint:

```javascript
import request from 'supertest';
import app from '../app'; // Path to your Express app

describe('POST /api/auth/login', () => {
  it('should return a token for valid login', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'user123',
        password: 'yourPassword',
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should return 401 for invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'user123',
        password: 'wrongPassword',
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials.');
  });
});
```

### Swagger Documentation

The API endpoints are fully documented using **Swagger**. You can view the Swagger-generated documentation by navigating to the following URL:

```
http://localhost:5000/api-docs
```

Swagger provides an interactive interface to explore and test API endpoints directly from the documentation.

## Environment Variables

- **JWT_SECRET**: Secret key used for signing JWT tokens.
- **MONGO_URI**: MongoDB URI connection string.

