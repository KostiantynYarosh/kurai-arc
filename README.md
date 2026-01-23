# Kurai Arc

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Go](https://img.shields.io/badge/Go-1.25+-00ADD8?style=flat&logo=go)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat&logo=docker)

**Kurai Arc** is a premium e-commerce platform designed for exclusive fashion drops and archival collections. Built with a high-performance **Go** backend and a cutting-edge **Next.js** frontend, it delivers a seamless, visually stunning shopping experience.

---

## Technology Stack

### Backend (`kurai-arc-api`)
- **Language**: [Go](https://go.dev/) (Golang) v1.25+
- **Framework**: [Gin Web Framework](https://github.com/gin-gonic/gin)
- **ORM**: [GORM](https://gorm.io/)
- **Database**: PostgreSQL (Neon.tech)
- **Architecture**: Modular Monolith (Clean Architecture)

### Frontend (`kurai-arc`)
- **Framework**: [Next.js](https://nextjs.org/) v16 (App Router)
- **Library**: React 19
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **Language**: TypeScript
- **Features**: Server Components (RSC), Dynamic Routing, Responsive Design

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Image Hosting**: AWS S3
- **Deployment**: Ready for cloud deployment (AWS, DigitalOcean, etc.)

---

## Getting Started

### Prerequisites
- [Go](https://go.dev/dl/) 1.25+
- [Node.js](https://nodejs.org/) 20+ (for local frontend dev)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [PostgreSQL](https://www.postgresql.org/) (or use Docker/Neon)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/kurai-arc.git
    cd kurai-arc
    ```

2.  **Environment Setup**
    Create `.env` files for both services.

    **Backend (`kurai-arc-api/.env`)**:
    ```ini
    DB_HOST=your-neon-host
    DB_USER=your-db-user
    DB_PASSWORD=your-db-password
    DB_NAME=kurai_arc
    DB_PORT=5432
    DB_SSLMODE=require
    ```

    **Frontend (`kurai-arc/.env.local`)**:
    ```ini
    NEXT_PUBLIC_API_URL=http://localhost:8080/api
    INTERNAL_API_URL=http://api:8080/api
    ```

3.  **Run with Docker Compose (Recommended)**
    This will start both the Go API and Next.js frontend in containers.
    ```bash
    docker-compose up --build
    ```
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend: [http://localhost:8080](http://localhost:8080)

### Local Development (Manual)

**Backend**:
```bash
cd kurai-arc-api
go mod download
go run cmd/api/main.go
```

**Frontend**:
```bash
cd kurai-arc
npm install
npm run dev
```

---

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/collections` | Fetch all collections |
| `GET` | `/api/products` | Fetch all products (optional `?collection=slug`) |
| `GET` | `/api/products/:slug` | Fetch a single product by slug |
| `POST` | `/api/orders` | Create a new order |

---

## Project Structure

```
kurai.arc/
├── docker-compose.yml   # Orchestrates API and Web services
├── kurai-arc/           # Next.js Frontend
│   ├── src/app/         # App Router pages
│   ├── src/components/  # React components
│   └── ...
└── kurai-arc-api/       # Go Backend
    ├── cmd/api/         # Entry point
    ├── internal/        # Application code
    │   ├── handlers/    # HTTP handlers
    │   ├── models/      # Data structures & SQL
    │   └── repository/  # DB access
    └── ...
```

## Features

- **Dynamic Product Showcase**: Infinite carousel loop with smooth transitions.
- **Archives & Drops**: Specialized views for past and current collections.
- **Responsive Design**: Fully optimized for mobile and desktop.
- **Secure Database**: SSL-enabled PostgreSQL connection.

---

Made by Kurai Arc Team.
