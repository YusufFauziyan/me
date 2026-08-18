# YuMa

<p align="center">
  <strong>An Intelligent AI Workspace for Document Intelligence, Data Analysis, Generative Media, and Multimodal Conversations.</strong>
</p>

<p align="center">
  <img src="/readmes/yuma/landing.png" alt="YuMa Landing Page" width="100%" />
</p>

---

## Overview

**YuMa** is a modern, full-stack AI workspace built with **Go** and **React 19**. It empowers users to converse with advanced language models, interrogate complex documents (PDFs, Word documents, PowerPoint presentations, CSVs, and Excel spreadsheets), profile tabular data, generate images, and listen to speech output in multiple languages.

- **Frontend** — React 19, TypeScript, Vite, Tailwind CSS, shadcn-style Radix UI primitives, Framer Motion, Sonner toast notifications, KaTeX math typesetting, and custom Monaco/VS Code dual-theme code highlighting.
- **Backend** — Go 1.26, Gin Web Framework, GORM, PostgreSQL 17 with `pgvector`, embedded SQL migrations, and auto-generated Swagger API documentation.
- **AI Models & Router** — OpenAI-compatible router supporting text streaming (SSE), image generation, and text-to-speech (TTS).
- **Object Storage** — Cloudflare R2 (S3-compatible) for secure document uploads and generated media storage.

---

## Screenshots & Product Tour

### 1. Landing & Interactive WebGL Experience
Features a dynamic WebGL wave background, rotating value propositions, feature highlights, and interactive exploration prompt input.

<p align="center">
  <img src="/readmes/yuma/landing.png" alt="YuMa Landing Experience" width="90%" />
</p>

---

### 2. Authentication & Google SSO
Clean, animated sign-in and sign-up with Google One Tap / SSO integration, standard email & password, 6-digit email OTP verification, and password recovery.

<p align="center">
  <img src="/readmes/yuma/login.png" alt="Authentication and Google SSO" width="90%" />
</p>

---

### 3. AI Chat & Real-Time Reasoning
Streaming Server-Sent Events (SSE), collapsible thinking/reasoning process, Monaco-styled dual-theme code blocks with copy/wrap/download controls, and KaTeX mathematical formula rendering.

<p align="center">
  <img src="/readmes/yuma/chat.png" alt="YuMa Chat Interface" width="90%" />
</p>

<p align="center">
  <img src="/readmes/yuma/response.png" alt="YuMa Response & Citations" width="90%" />
</p>

---

### 4. Document Intelligence & Analytics
Upload PDF, Word, PowerPoint, Excel, CSV, JSON, Markdown, and source code files. Includes interactive Donut and Storage Bar visual charts, per-column profiling (min/mean/max stats, distinct counts), and content preview modals with instant table and raw text views.

<p align="center">
  <img src="/readmes/yuma/documents.png" alt="Document Intelligence and Data Analytics" width="90%" />
</p>

---

### 5. Profile, Preferences & Security
Custom instructions, default model selection, avatar personalization, light/dark theme switching, language preferences for text-to-speech, active session revocation, and secure account deletion.

<p align="center">
  <img src="/readmes/yuma/account.png" alt="Account and Preferences" width="48%" />
  <img src="/readmes/yuma/delete-account.png" alt="Security and Account Management" width="48%" />
</p>

---

## Quick Start

### Prerequisites
- **Go** 1.26+
- **Node.js** 20+
- **PostgreSQL** 17 (or Docker container on port 5433)

### Installation & Run

```bash
# 1. Database setup (PostgreSQL)
docker exec yu-tomation-postgres psql -U yutomation -d postgres -c "CREATE DATABASE yuma;"

# 2. Backend (migrations run automatically at boot)
cd backend
go mod download
go run ./cmd/api            # http://localhost:8080

# 3. Frontend
cd frontend
npm install
npm run dev                 # http://localhost:5173
```

### Service Endpoints

| Service        | URL                                    | Description |
| -------------- | -------------------------------------- | ----------- |
| Web App        | `http://localhost:5173`                  | React Frontend UI |
| API Base       | `http://localhost:8080/api/v1`           | RESTful API endpoints |
| Swagger Docs   | `http://localhost:8080/swagger/index.html` | Interactive Swagger API specification |
| Health Check   | `http://localhost:8080/health`           | System and database health status |

---

## Feature Matrix

| Module | Features |
| ------ | -------- |
| **Landing** | WebGL wave canvas, rotating taglines, prompt-to-chat onboarding, responsive navigation. |
| **Auth** | Google SSO (ID-token flow), email/password login, 6-digit OTP verification, JWT + refresh token rotation. |
| **Chat** | Real-time SSE streaming, visible reasoning models, Monaco code styling, KaTeX formulas, session history management (pin, rename, delete). |
| **Document Intelligence** | 30+ supported file types (PDF, XLSX, CSV, DOCX, PPTX, JSON, code), chunking, lexical passage retrieval, column range profiling, and instant preview. |
| **Generative Media** | Text-to-image synthesis stored directly in Cloudflare R2 and served through secure endpoints. |
| **Speech & Audio** | Native Text-to-Speech (TTS) audio playback in the user's preferred language. |
| **Settings & Account** | Profile avatars, system theme toggles, model selector, custom system prompts, and security management. |

---

## Documentation

For comprehensive technical documentation, refer to the [docs/](docs/) directory:

- [docs/README.md](docs/README.md) — Documentation index
- [docs/architecture.md](docs/architecture.md) — System architecture, data flow, and database models
- [docs/flows.md](docs/flows.md) — Request and authentication flows
- [docs/api.md](docs/api.md) — API reference and SSE stream contract
- [docs/setup.md](docs/setup.md) — Environment variables, external service setup, and production guide
- [docs/status.md](docs/status.md) — Implementation status and completed milestones
- [docs/roadmap.md](docs/roadmap.md) — Future enhancements and roadmap
- [docs/decisions.md](docs/decisions.md) — Architectural decision records (ADR)
- [AGENTS.md](AGENTS.md) — Working agreements and codebase conventions

---

## Project Structure

```
chatbot-ai/
├── README.md              # Project documentation and screenshots
├── AGENTS.md              # Repository conventions & working agreements
├── docs/                  # Architectural documents and assets
│   └── images/            # Screenshot assets
├── backend/               # Go API application
│   ├── cmd/api/           # Entry point and Swagger configuration
│   ├── internal/
│   │   ├── config/        # Environment configurations
│   │   ├── database/      # SQL connection and embedded migrations
│   │   ├── handlers/      # HTTP handlers (auth, chat, documents, user)
│   │   ├── middleware/    # Auth, CORS, rate limiting, error recovery
│   │   ├── models/        # GORM database models
│   │   ├── router/        # Route registration
│   │   ├── services/      # Business logic (LLM, Storage, Parser, Auth, Mail)
│   │   └── utils/         # JSON error & envelope helpers
│   └── docs/              # Generated Swagger documentation
└── frontend/              # React 19 Single Page Application
    └── src/
        ├── components/    # Radix UI primitives, Chat, Brand, Landing, Charts
        ├── pages/         # Landing, Auth, Chat, Documents, Settings
        ├── store/         # Zustand global state (auth, chat)
        ├── lib/           # API client, SSE stream reader, utilities
        └── hooks/         # Custom React hooks (Google SSO, Typing cycle)
```

---

## License

This project is private and proprietary. All rights reserved.
