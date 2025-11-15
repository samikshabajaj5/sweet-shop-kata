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

# 🎨 Frontend (Next.js) — Overview

The frontend for the Sweet Shop Management System is built using:

- **Next.js 14 (App Router)**
- **React**
- **Tailwind CSS**
- **ShadCN UI Components**
- **Axios**
- **Context API for Authentication**
- **Sonner Toast Notifications**

It provides a clean, modern UI for users and admins to interact with the backend API.

---

# 🧁 Frontend Features

### 👤 Authentication

- Login using backend API
- JWT stored in localStorage
- Auto-redirect if not authenticated
- Role-based UI rendering (admin/user)

### 🍬 Sweets

- List all sweets
- Search sweets by name
- View sweet details
- Display sweet images
- Purchase sweets (quantity reduces)

### 🛠 Admin Tools

- Add new sweets
- Edit existing sweets
- Delete sweets
- Restock inventory
- All operations protected by admin role check

### 🎨 UI Components

- ShadCN cards, inputs, buttons
- Clean responsive layout
- Image fallback support
- Toast notifications for actions

---

# 📁 Frontend Project Structure

```
frontend/
  ├── app/
  │   ├── login/
  │   ├── dashboard/
  │   ├── sweets/
  │   ├── admin/
  │   └── layout.tsx
  │
  ├── components/
  │   ├── ui/
  │   └── shared/
  │
  ├── context/
  │   └── AuthContext.tsx
  │
  ├── lib/
  │   └── api/axios.ts
  │
  ├── public/
  │   └── placeholder.png
  │
  ├── styles/
  └── README.md
```

---

# 🔌 Connecting Frontend → Backend

Create `.env.local` in the **frontend folder**:

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

Axios automatically reads this:

```ts
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
```

Every request includes JWT:

```ts
Authorization: Bearer<token>;
```

AuthContext injects token using axios interceptors.

---

# ▶️ Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

Backend API must be running on port 4000.

---

# 📸 Image Handling

Sweet images come from URLs stored in the database.

If an image does not load:

```tsx
<img
  src={sweet.imageUrl || "/placeholder.png"}
  className="object-cover rounded-md"
/>
```

Supported image domains are configured in `next.config.js`.

---

# 🤝 How Backend & Frontend Work Together

### Backend provides:

- Auth endpoints
- Sweet CRUD
- Purchase logic
- Inventory updates

### Frontend provides:

- UI screens
- Login form
- Dashboard
- Sweet list
- Admin management UI
- Purchase flow

### Flow Example

1. User logs in → frontend gets JWT
2. Frontend fetches sweets → `/api/v1/sweets`
3. User clicks “Buy” → frontend calls `/sweets/:id/purchase`
4. Backend decreases quantity and returns updated value
5. Frontend updates UI instantly

---

# 🧱 Production Deployment (Both Apps)

### Backend:

- Build with `npm run build`
- Deploy `dist/` folder
- Works on Docker, Render, Railway, GCP, Heroku, AWS, etc.

### Frontend:

- Deploy with:

  - Vercel (recommended)
  - Netlify
  - Render Static
  - Custom server

### Required env variables:

Backend:

```
PORT=4000
JWT_SECRET=your-secret
DATABASE_URL=file:./db.sqlite
```

Frontend:

```
NEXT_PUBLIC_API_URL=https://your-backend-url/api/v1
```

---

# 🏁 Status

Backend: **Complete ✔**
Frontend: **Integrated & fully functional ✔**
Images: **Working & stable after fix ✔**

```
Sweet Shop — Full Stack Implementation Ready 🚀
```
