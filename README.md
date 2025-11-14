# 🍬 Sweet Shop Management System — Backend (Express + TypeScript)

This is the backend service for the **Sweet Shop Management System** built as part of the Incubyte TDD Kata.  
It is a fully production-grade API following:

- Test-Driven Development (TDD)
- Clean architecture (controllers → services → models)
- Zod validation
- JWT-based authentication
- Centralized error handling
- Dockerized container support
- Swagger API documentation
- Extensive logging (request + response + correlation IDs)

---

## 🚀 Features

### ✔ Authentication (JWT)

- Register
- Login
- Role-based access (admin / user)

### ✔ Sweet Management

- Create sweet
- Update sweet
- Delete sweet (admin only)
- List sweets
- Search sweets (name, category, price range)

### ✔ Inventory

- Purchase sweet (decrease quantity)
- Restock sweet (admin only)

### ✔ Developer Features

- Zod validation
- Async handler for automatically catching errors
- Centralized AppError system
- Request logging with correlation IDs
- Response logging middleware
- SQLite database (persistent volume in Docker)
- Swagger at `/api-docs`

---

## 📦 Project Structure

```

backend/
src/
controllers/
services/
routes/
middleware/
models/
schemas/
utils/
errors/
swagger.ts
scripts/
seed.ts
Dockerfile
docker-compose.yml
.env.example

```

---

## 🛠️ Installation

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Create `.env` file

Copy from the example:

```bash
cp .env.example .env
```

### 3. Run development server

```bash
npm run dev
```

Backend runs at:

```
http://localhost:4000
```

---

## 🧪 Running Tests

```bash
npm test
```

Test suite covers:

- Auth
- Sweets
- Inventory
- Core API health

---

## 🌱 Seeding the Database

To populate initial users and sweets:

```bash
npm run seed
```

Creates:

### Users

- [admin@example.com](mailto:admin@example.com) (admin)
- [john@example.com](mailto:john@example.com)
- [jane@example.com](mailto:jane@example.com)

### Sweets

6 sample sweets (chocolate, candy, caramel, etc.)

---

## 🐳 Docker (Full System)

Start backend in Docker:

```bash
docker compose up --build
```

Backend → [http://localhost:4000](http://localhost:3000)
Swagger → [http://localhost:4000/api-docs](http://localhost:3000/api-docs)

SQLite DB is stored in a persistent volume:

```
sqlite_data
```

---

## 📘 API Documentation (Swagger)

Swagger UI is auto-generated and available at:

```
http://localhost:3000/api-docs
```

---

## 🤖 My AI Usage (Required Section)

This project uses AI assistants (ChatGPT) to:

- Draft boilerplate Express controllers and services
- Generate test cases during the initial TDD setup
- Refactor code into clean architecture
- Write validation schemas (Zod)
- Generate Swagger documentation boilerplate
- Produce Docker configurations (Dockerfile & docker-compose)
- Assist in writing middleware (logging, response logging, security)
- Produce README documentation

All code was **reviewed, corrected, and integrated manually**.
AI was used as a co-author to speed up development, maintain clean patterns, and ensure production-quality structure.

AI-assisted commits include a `Co-authored-by` trailer as required.

---

## 🏁 Status

Backend is **complete and production-ready**.
Next phase: Build the **Next.js frontend** and connect it to this API.

```
Sweet Shop Backend — Completed ✔
```

```
Next.js Frontend — Pending ⏳
```
