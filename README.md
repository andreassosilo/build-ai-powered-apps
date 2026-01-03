# 🤖 Build AI-Powered Apps

> A full-stack TypeScript application demonstrating AI integration with multiple LLM providers, featuring an intelligent chatbot and AI-powered product review summarization.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This project showcases modern full-stack development with AI integration, built using TypeScript, React, and Express. It demonstrates how to integrate multiple AI providers (OpenAI, Ollama, Hugging Face) into a production-ready application with features like intelligent chatbots and AI-powered content summarization.

## ✨ Features

- **🤖 Multi-Provider AI Integration**
  - Support for OpenAI, Ollama, and Hugging Face
  - Flexible AI provider switching
  - Configurable prompts and models

- **💬 Intelligent Chatbot**
  - Real-time chat interface
  - Context-aware conversations
  - Typing indicators and smooth UX

- **⭐ Product Review System**
  - Display product reviews with ratings
  - Star rating visualization
  - Review filtering and sorting

- **📊 AI-Powered Review Summarization**
  - Generate intelligent summaries from multiple reviews
  - Cached summaries with expiration
  - Efficient data processing

- **🏗️ Modern Architecture**
  - Monorepo structure with workspaces
  - Type-safe database queries with Prisma
  - RESTful API design
  - Responsive UI with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Data fetching and caching
- **Radix UI** - Accessible component primitives
- **Axios** - HTTP client

### Backend
- **Express 5** - Web framework
- **Bun** - JavaScript runtime
- **TypeScript** - Type safety
- **Prisma 7** - Next-generation ORM
- **MySQL** - Relational database
- **Zod** - Schema validation

### AI Integration
- **OpenAI** - GPT models
- **Ollama** - Local LLM support
- **Hugging Face** - Open-source models

### DevOps & Tools
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting
- **Prettier** - Code formatting
- **ESLint** - Code linting

## 📁 Project Structure

```
build-ai-powered-apps/
├── packages/
│   ├── client/                 # React frontend application
│   │   ├── src/
│   │   │   ├── components/    # React components
│   │   │   │   ├── chat/      # Chatbot components
│   │   │   │   ├── reviews/   # Review components
│   │   │   │   └── ui/        # UI primitives
│   │   │   └── lib/           # Utilities
│   │   └── package.json
│   │
│   └── server/                # Express backend application
│       ├── controllers/       # Route controllers
│       ├── services/          # Business logic
│       ├── repositories/      # Data access layer
│       ├── routes.ts          # API routes
│       ├── prisma/            # Prisma schema and migrations
│       ├── generated/         # Generated Prisma client
│       └── package.json
│
├── package.json               # Root package.json (workspaces)
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** v20.19+, v22.12+, or v24.0+
- **Bun** v1.0+ ([Install Bun](https://bun.sh/docs/installation))
- **MySQL** 8.0+ (or MariaDB 10.3+)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/andreassosilo/build-ai-powered-apps.git
   cd build-ai-powered-apps
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Install dependencies for each package**
   ```bash
   cd packages/client && bun install
   cd ../server && bun install
   ```

### Environment Variables

Create a `.env` file in the `packages/server` directory:

```env
# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
DATABASE_HOST="localhost"
DATABASE_USER="your_username"
DATABASE_PASSWORD="your_password"
DATABASE_NAME="your_database"

# Server Configuration
PORT=3000

# AI Provider Configuration
# OpenAI
OPENAI_API_KEY="your_openai_api_key"
OPENAI_MODEL="gpt-3.5-turbo"

# Ollama (optional)
OLLAMA_BASE_URL="http://localhost:11434"
OLLAMA_MODEL="llama2"

# Hugging Face (optional)
HUGGINGFACE_API_KEY="your_huggingface_api_key"
```

### Database Setup

1. **Create your MySQL database**
   ```sql
   CREATE DATABASE your_database_name;
   ```

2. **Run Prisma migrations**
   ```bash
   cd packages/server
   bunx prisma migrate dev
   ```

3. **Generate Prisma Client**
   ```bash
   bunx prisma generate
   ```

### Running the Application

**Development mode (runs both client and server):**

From the root directory:
```bash
bun run dev
```

**Or run separately:**

Terminal 1 - Server:
```bash
cd packages/server
bun run dev
```

Terminal 2 - Client:
```bash
cd packages/client
bun run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 📚 API Documentation

### Chat Endpoints

#### `POST /api/chat`
Send a message to the AI chatbot.

**Request Body:**
```json
{
  "prompt": "Hello, how are you?",
  "conversationId": "optional-conversation-id"
}
```

**Response:**
```json
{
  "message": "I'm doing well, thank you! How can I help you today?",
  "conversationId": "conversation-id"
}
```

### Review Endpoints

#### `GET /api/products/:id/reviews`
Get all reviews for a specific product.

**Parameters:**
- `id` (number) - Product ID

**Response:**
```json
[
  {
    "id": 1,
    "author": "John Doe",
    "rating": 5,
    "content": "Great product!",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "productId": 1
  }
]
```

#### `POST /api/products/:id/reviews/summarize`
Generate an AI summary of all reviews for a product.

**Parameters:**
- `id` (number) - Product ID

**Response:**
```json
{
  "summary": "Based on 10 reviews, this product has an average rating of 4.5 stars...",
  "generatedAt": "2024-01-01T00:00:00.000Z",
  "expiresAt": "2024-01-02T00:00:00.000Z"
}
```

## 💻 Development

### Code Formatting

Format code with Prettier:
```bash
bun run format
```

### Git Hooks

This project uses Husky for Git hooks. Pre-commit hooks will automatically:
- Run lint-staged to format and lint staged files
- Ensure code quality before commits

### Database Management

**Open Prisma Studio** (visual database editor):
```bash
cd packages/server
bunx prisma studio
```

**Create a new migration:**
```bash
cd packages/server
bunx prisma migrate dev --name your_migration_name
```

**Reset database:**
```bash
cd packages/server
bunx prisma migrate reset
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Andreas Sosilo**

- GitHub: [@andreassosilo](https://github.com/andreassosilo)
- Twitter: [@andreassosilo](https://twitter.com/andreassosilo)
- LinkedIn: [Andreas Sosilo](https://www.linkedin.com/in/andreassosilo)

## 🙏 Acknowledgments

- [Prisma](https://www.prisma.io/) for the amazing ORM
- [Vite](https://vitejs.dev/) for the blazing-fast build tool
- [Bun](https://bun.sh/) for the fast JavaScript runtime
- All the open-source contributors and libraries that made this project possible

---

⭐ If you found this project helpful, please consider giving it a star!
