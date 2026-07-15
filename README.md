# 🚀 Simple User API

A production-ready RESTful API built with **Node.js**, **Express.js**, **PostgreSQL**, **Redis**, **Docker**, and **JWT Authentication**.

---

## ✨ Features

- 🔐 JWT Authentication
- 🔄 Refresh Token
- 🔑 Forgot Password & Reset Password
- 👤 Role-Based Authorization
- 📁 File Upload (Multer)
- 🛡 Helmet Security
- 🌍 CORS Protection
- 🚦 Rate Limiting
- 📄 Swagger API Documentation
- 🗄 PostgreSQL Database
- ⚡ Redis Caching
- 🐳 Docker & Docker Compose
- ✅ Jest & Supertest
- 🚀 GitHub Actions CI

---

## 🛠 Technologies

- Node.js
- Express.js
- PostgreSQL
- Redis
- Docker
- Docker Compose
- JWT
- Multer
- Swagger
- Jest
- Supertest
- GitHub Actions

---

## 📂 Project Structure

```text
simple-user-api
│
├── controllers
├── services
├── routes
├── middlewares
├── validators
├── docs
├── tests
├── uploads
├── .github/workflows
├── docker-compose.yml
├── redisClient.js
├── db.js
├── index.js
└── package.json
```

---

## ⚙ Installation

```bash
git clone https://github.com/keremkilinc123/simple-user-api.git

cd simple-user-api

npm install
```

---

## 🐳 Docker

Start PostgreSQL and Redis

```bash
docker compose up -d
```

---

## ▶ Run the project

```bash
npm run dev
```

---

## 🧪 Run Tests

```bash
npm test
```

---

## 📖 Swagger

```text
http://localhost:3000/api-docs
```

---

## 📌 API Endpoints

### Authentication

```
POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/forgot-password
POST /auth/reset-password
```

### Users

```
GET /users
GET /users/:id
POST /users
PUT /users/:id
DELETE /users/:id
GET /users/profile
POST /users/upload
```

---

## 👨‍💻 Author

Kerem Kilinc

GitHub

https://github.com/keremkilinc123