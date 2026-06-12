# SmartGym | Complete Gym Management System

[![Java](https://img.shields.io/badge/Java-25-orange.svg)](https://java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-blueviolet.svg)](https://tailwindcss.com/)

## About the Project
SmartGym is a robust, production-ready Full-Stack Gym and Sports Center Management application. The project couples a modern server-side architecture (RESTful API built with Java and Spring Boot) with a high-fidelity client interface (built with Next.js, TypeScript, and Tailwind CSS).

The core philosophy of this project is to apply **solid software engineering patterns, clean architecture separation of concerns, and robust security workflows** to solve real-world business logic. It serves as a comprehensive portfolio piece demonstrating modern web application development and containerized deployment.

---

## Key Features

### Advanced Security & JWT Session Lifecycle
- **Stateless JWT Security:** Structured authentication layer verifying request tokens with Spring Security.
- **Database Session Auditing:** Active tokens are stored and verified against a `token` registry database, allowing instant server-side revocation on logout.
- **Silent JWT Refresh Rotation:** Custom HTTP interceptor (`apiFetch`) in Next.js that catches `401/403` responses, silently requests a token renewal using a secure HTTP-Only `refreshToken`, retries the failed request, or redirects to `/login` if both tokens are expired.
- **Secure Credentials:** Standardized password encryption using BCrypt.

### Role-Based Access Control (RBAC)
- **Role-based UI:** The client application dynamically adapts navigation options, listing views, and action links depending on the logged-in user's role:
  - `ROLE_ADMIN`: Full directory control (members, staff, salaries, classes).
  - `ROLE_MONITOR`: View directory, manage schedules, and edit classes.
  - `ROLE_MEMBER`: View own profile, browse standard/premium classes, and manage active enrollments.
- **Route Protection:** Middlewares/proxies block unauthorized page access and redirect users to their appropriate dashboard profiles.

### Class Catalog & Enrollment Manager
- **Access Control Tiers:** Classes can be flagged as *Standard* or *Premium*. Standard members are restricted from enrolling in premium activities.
- **Cascade Subscription Cleanup:** Banning/downgrading a premium member automatically removes them from all premium activities in the database.
- **Interactive Ratings:** Members can rate gym activities using an interactive star component, feeding an automatic calculations utility that returns a live decimal average score.

### Relational DB Modeling
- **JPA Joined Inheritance:** Database decoupling of `Member` and `Monitor` rows which inherit personal columns from a unified parent `Person` table.
- **Spanish DNI Validation:** Proprietary validations (`@ValidSpanishDni`) enforcing Spanish ID card format verification.

---

## Technology Stack

### Backend
- **Core:** Java 25 & Spring Boot 4.0 (MVC, Data JPA, Security)
- **Database:** PostgreSQL 18
- **Authentication:** JSON Web Tokens (jjwt)
- **Validation:** Jakarta Validation
- **Boilerplate reduction:** Lombok, MapStruct

### Frontend
- **Framework:** Next.js (App Router, Server Actions, Middleware)
- **Library:** React
- **Typing:** TypeScript
- **Styling:** Tailwind CSS & Lucide Icons
- **HTTP Client:** Fetch API with Custom Interceptors

---

## Repository Structure
```bash
smartgym/
├── backend/             # Spring Boot REST API
│   ├── src/main/java    # Domain models, services, controllers, DTOs
│   └── src/resources    # application.properties, data.sql (db seed)
├── frontend/            # Next.js web application
│   ├── src/actions      # Server Actions (cookies management, token refresh)
│   ├── src/app          # Page routes (dashboard, login, activities, members)
│   └── src/components   # Shared visual components (tables, modals, ratings)
└── docker-compose.yml   # Multi-container orchestration (PostgreSQL + API)
```

---

## Getting Started

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) or [Node.js & npm](https://nodejs.org/) and [Java 25 & Maven](https://maven.apache.org/) installed locally.

### Option A: Complete Run via Docker Compose
Run the backend API and database in a containerized environment:
1. Spin up the infrastructure:
   ```bash
   docker compose up --build -d
   ```
   *The database will be automatically initialized and seeded with mock members, monitors, and activities.*
2. Start the Next.js development server:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *The website will be available at `http://localhost:3000`.*

### Option B: Local Manual Run

#### 1. Backend (Spring Boot)
1. Configure your local PostgreSQL database credentials in `backend/src/main/resources/application.properties`.
2. Run the application:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   *The API runs at `http://localhost:8080`.*

#### 2. Frontend (Next.js)
1. Define the backend URL in a `.env.local` file inside the `frontend` directory:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
   ```
2. Start the development server:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *The web client runs at `http://localhost:3000`.*

---

## Author
**David Diéguez Sánchez**  
*Software Development Student | Aspiring Full-Stack & Backend Developer*
