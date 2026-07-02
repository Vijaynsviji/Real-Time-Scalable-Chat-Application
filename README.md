# 🔐 Secure End-to-End Encrypted Real-Time Chat Application

A scalable, secure, end-to-end encrypted real-time chat application built using **React**, **Node.js**, **TypeScript**, and **PostgreSQL**. The application ensures that only conversation participants can read messages by implementing **RSA-OAEP** and **AES-GCM** encryption using the **Web Crypto API**.

---

## 🚀 Features

### 🔒 Security
- End-to-End Encryption (E2EE)
- RSA-OAEP Public/Private Key Cryptography
- AES-GCM Symmetric Encryption
- Client-side Message Encryption & Decryption
- Secure Symmetric Key Exchange
- JWT Authentication
- Protected REST APIs
- Password Hashing
- Authorization Middleware

### 💬 Messaging
- One-to-One Conversations
- Real-Time Messaging
- Conversation Management
- Message History
- Pagination
- User Search
- Responsive Chat Interface

### ⚡ Scalability
- Background Workers
- Batch Database Operations
- Optimized Database Writes
- Dockerized Services
- Container Orchestration using Docker Compose

### 🛠 Developer Experience
- Modular Project Structure
- TypeScript
- Environment-based Configuration
- RESTful API Design
- Error Handling
- Logging

---

# 🏗 Architecture

---

<img width="1153" height="564" alt="Screenshot 2026-03-06 222250" src="https://github.com/user-attachments/assets/8c82a56d-fd9d-4cec-9504-4c059f2fb302" />

---

# 🔐 End-to-End Encryption Flow

```
User A
│
├── Generate RSA Key Pair
│
├── Fetch User B Public Key
│
├── Generate AES Conversation Key
│
├── Encrypt AES Key using User B Public Key
│
├── Encrypt Message using AES-GCM
│
└── Send Encrypted Message + Encrypted AES Key
                      │
                      ▼
                  Server Stores Only
          • Cipher Text
          • Encrypted AES Key
          • Metadata
                      │
                      ▼
                  User B
          Decrypt AES Key
                 │
                 ▼
         Decrypt Message
```

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Material UI
- React Router
- Axios

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL

## Authentication

- JWT
- bcrypt

## Cryptography

- Web Crypto API
- RSA-OAEP
- AES-GCM

## DevOps

- Docker
- Docker Compose

---

# 📁 Project Structure

```
ChatApplication
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── services
│   └── utils
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── services
│   ├── models
│   └── utils
│
├── backend-worker
│   ├── jobs
│   ├── workers
│   └── queues
│
├── docker-compose.yml
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/Vijaynsviji/Real-Time-Scalable-Chat-Application.git

cd Real-Time-Scalable-Chat-Application
```


# 📈 Highlights

- Full Stack Application
- Secure End-to-End Encryption
- Modern Cryptography
- Client-side Encryption
- Background Workers
- Scalable Architecture
- Dockerized Deployment
- Production-Oriented Project Structure

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Vijay N S**

- GitHub: https://github.com/Vijaynsviji
- LinkedIn: https://linkedin.com/in/vijay-n-s-08354b1a2


