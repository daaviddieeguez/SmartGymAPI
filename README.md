# SmartGym API

[![Java](https://img.shields.io/badge/Java-25-orange.svg)](https://java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)

## About the Project
SmartGym is a robust RESTful API designed for comprehensive gym and sports center management. This project originated as an Object-Oriented console application and has evolved into a modern, scalable server-side architecture.

The main goal of this project is to apply **solid software engineering fundamentals to backend development**, prioritizing a clean architecture, correct relational database modeling, and seamless containerized deployment.

## Architecture & Patterns
- **Core (Spring Boot):** Strict multi-layer architecture (Controller, Service, Repository) to ensure separation of concerns.
- **DTO Pattern & Mappers:** Clear boundary between database Entities (Persistence layer) and the objects exposed via endpoints (Presentation layer).
- **Advanced JPA Inheritance (`JOINED`):** Complex database modeling where different user types (`Member` and `Monitor`) inherit from a single parent table (`Person`).
- **Custom Validations:** Implementation of proprietary annotations (e.g., `@ValidSpanishDni`) and global error handling using `@ControllerAdvice`.

## Getting Started (Local & Docker)

This project uses **Docker Compose** to ensure the database and the API run reliably on any machine with a single command, without the need to manually install PostgreSQL or configure environment variables.

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/daaviddieeguez/smartgym.git
   cd smartgym
   ```
2. Spin up the complete infrastructure (Database + API):
   ```bash
   docker compose up --build -d
   ```
  *The API will be available at `http://localhost:8080`.*
  *The PostgreSQL database will be automatically initialized and seeded with mock data.*

3. To stop the containers:
   ```bash
   docker compose down
   ```
## Author
**David Diéguez Sánchez**

Software Development Student | Aspiring Backend Developer
