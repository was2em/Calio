# Python Backend Packages

## Recommended Environment

- **Python:** 3.12.x
- **Framework:** FastAPI
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy 2.x
- **Validation:** Pydantic 2.x
- **Cache:** Valkey
- **Authentication:** JWT + Argon2
- **Server:** Uvicorn

---

## 1. Core FastAPI Packages

### Installation

```bash
pip install fastapi uvicorn[standard]
```

| Package | Purpose |
|---|---|
| `fastapi` | Modern Python framework for building REST APIs, WebSocket endpoints, dependency injection, validation, and automatic OpenAPI/Swagger documentation. |
| `uvicorn[standard]` | ASGI server used to run the FastAPI application. The `standard` extras add useful production/development dependencies. |

---

## 2. Database Packages

### Installation

```bash
pip install sqlalchemy psycopg[binary] alembic
```

| Package | Purpose |
|---|---|
| `sqlalchemy` | SQLAlchemy 2.x ORM and SQL toolkit for communicating with PostgreSQL and managing database models/queries. |
| `psycopg[binary]` | Psycopg 3 PostgreSQL driver used by SQLAlchemy to connect to PostgreSQL. |
| `alembic` | Database migration tool for creating and applying schema changes safely. |

### Architecture

```text
FastAPI
   ↓
SQLAlchemy 2.x
   ↓
Psycopg 3
   ↓
PostgreSQL
```

---

## 3. Pydantic and Configuration

### Installation

```bash
pip install pydantic pydantic-settings
```

| Package | Purpose |
|---|---|
| `pydantic` | Validates request/response data and defines API schemas using Python type hints. |
| `pydantic-settings` | Loads and validates application configuration from environment variables and `.env` files. |

### Example

```python
from pydantic import BaseModel, ConfigDict

class UserResponse(BaseModel):
    id: int
    email: str

    model_config = ConfigDict(from_attributes=True)
```

> Use Pydantic 2.x patterns such as `ConfigDict(from_attributes=True)`. Avoid old Pydantic v1 `orm_mode = True` examples.

---

## 4. Authentication and Password Security

### Installation

```bash
pip install PyJWT pwdlib[argon2]
```

| Package | Purpose |
|---|---|
| `PyJWT` | Creates and verifies JSON Web Tokens (JWT) for authentication. |
| `pwdlib[argon2]` | Secure password hashing using Argon2. Passwords should never be stored as plain text. |

### Authentication flow

```text
Login
  ↓
Verify password
  ↓
Argon2
  ↓
Create JWT
  ↓
Client
  ↓
Authorization: Bearer <token>
```

---

## 5. HTTP Client

### Installation

```bash
pip install httpx
```

| Package | Purpose |
|---|---|
| `httpx` | Async/synchronous HTTP client for calling external REST APIs, AI services, internal services, and third-party APIs. |

Example use cases:

```text
FastAPI
   ├── AI API
   ├── Payment API
   ├── External REST API
   └── Internal Microservice
```

---

## 6. Redis-Compatible Client / Valkey

### Installation

```bash
pip install redis
```

| Package | Purpose |
|---|---|
| `redis` | Python client for Redis-compatible servers such as Valkey. Useful for caching, sessions, rate limiting, presence, temporary data, and pub/sub. |

### Important

The `redis` package is the **Python client**.

Valkey itself should normally be run as a server/container, for example with Docker.

```text
FastAPI
   ↓
redis Python client
   ↓
Valkey
```

---

## 7. Testing

### Installation

```bash
pip install pytest pytest-asyncio httpx
```

| Package | Purpose |
|---|---|
| `pytest` | Main Python testing framework. |
| `pytest-asyncio` | Allows testing of asynchronous FastAPI/Python code. |
| `httpx` | Used for HTTP testing and async API clients. |

Example test areas:

```text
tests/
├── test_auth.py
├── test_users.py
├── test_messages.py
└── test_websocket.py
```

---

## 8. Code Quality

### Installation

```bash
pip install ruff mypy
```

| Package | Purpose |
|---|---|
| `ruff` | Fast Python linter and formatter. Helps detect errors and maintain consistent code. |
| `mypy` | Static type checker that catches many type-related problems before runtime. |

Recommended workflow:

```text
Write Code
    ↓
Ruff
    ↓
Mypy
    ↓
Pytest
    ↓
Commit
```

---

# 9. Packages You Do NOT Need to Install Separately

FastAPI/Starlette already provides several important features.

## CORS

No separate package is required.

```python
from fastapi.middleware.cors import CORSMiddleware
```

Used to allow your React frontend to communicate with your FastAPI backend.

---

## WebSockets

No separate WebSocket package is required for basic FastAPI WebSockets.

```python
from fastapi import WebSocket
```

Useful for:

- Real-time chat
- Notifications
- Online/offline presence
- Typing indicators
- WebRTC signaling

---

## File Uploads

No separate package is required for basic FastAPI file uploads.

```python
from fastapi import UploadFile, File
```

---

## Background Tasks

FastAPI provides simple background tasks:

```python
from fastapi import BackgroundTasks
```

Do not install Celery or another task queue unless the application actually requires distributed/background job processing.

---

# 10. LiveKit

Install this when you start implementing group video/audio calls.

### Installation

```bash
pip install livekit-api
```

| Package | Purpose |
|---|---|
| `livekit-api` | Python server-side SDK for interacting with LiveKit, including generating access tokens and working with LiveKit APIs. |

Architecture:

```text
React
   ↓
FastAPI
   ↓
LiveKit token
   ↓
LiveKit Server
   ↓
Audio / Video / Screen Sharing
```

LiveKit itself can be self-hosted separately, commonly using Docker.

---

# 11. WebRTC

For browser-based WebRTC, you generally **do not need a Python package**.

WebRTC is built into modern browsers.

The browser provides APIs such as:

```javascript
RTCPeerConnection
```

FastAPI can provide the signaling layer using WebSockets.

```text
Browser A
    │
    │ WebSocket signaling
    ▼
 FastAPI
    │
    │ WebSocket signaling
    ▼
Browser B

Browser A ←──── WebRTC ────→ Browser B
             Audio/Video
```

For production deployments, STUN/TURN may also be required depending on network conditions.

---

# 12. AI Packages

These should be installed only when the AI portion of the application is implemented.

## OpenAI

```bash
pip install openai
```

Used to communicate with OpenAI APIs.

## Hugging Face Transformers

```bash
pip install transformers
```

Used for running or integrating Hugging Face transformer models.

> Do not install `transformers` just because the project may eventually use AI. It can bring many additional dependencies. Install it when local/transformer model functionality is actually needed.

---

# 13. Recommended Initial Installation

For the initial backend, install:

```bash
pip install fastapi uvicorn[standard] sqlalchemy psycopg[binary] alembic pydantic pydantic-settings PyJWT pwdlib[argon2] httpx redis pytest pytest-asyncio ruff mypy
```

Then save the exact environment:

```bash
pip freeze > requirements.txt
```

Later, install additional packages only when their feature is implemented.

---

# 14. Complete Package Map

```text
Python Backend
│
├── FastAPI
│   └── REST APIs
│
├── Uvicorn
│   └── ASGI server
│
├── Pydantic
│   └── Request/response validation
│
├── Pydantic Settings
│   └── Configuration/.env
│
├── SQLAlchemy 2.x
│   └── ORM/database access
│
├── Psycopg 3
│   └── PostgreSQL driver
│
├── Alembic
│   └── Database migrations
│
├── PyJWT
│   └── JWT authentication
│
├── pwdlib + Argon2
│   └── Password hashing
│
├── HTTPX
│   └── External HTTP APIs
│
├── redis
│   └── Python client for Valkey
│
├── Pytest
│   └── Testing
│
├── Pytest-asyncio
│   └── Async testing
│
├── Ruff
│   └── Linting/formatting
│
├── Mypy
│   └── Static type checking
│
└── LiveKit API
    └── Group video/audio
```

---

# 15. Suggested Project Dependency Strategy

Do not install every possible package on day one.

### Install now

```text
FastAPI
Uvicorn
SQLAlchemy
Psycopg
Alembic
Pydantic
Pydantic Settings
PyJWT
pwdlib + Argon2
HTTPX
redis
Pytest
Pytest-asyncio
Ruff
Mypy
```

### Install when needed

```text
LiveKit API       → group calls
OpenAI            → OpenAI integration
Transformers      → local/Hugging Face models
Vector DB packages → RAG
Celery/task queue → distributed background jobs
Email package     → application email
```

This approach keeps the dependency tree smaller and greatly reduces unnecessary version conflicts.
