# 🤖 AI Task Platform

A full-stack asynchronous task processing platform built with the MERN stack, Python worker, Redis queue, Docker, and Kubernetes. Users can register, log in, submit text processing tasks, and view real-time results.

Frontend url: https://ai-task-frontend-zf9d.onrender.com

Backend url:https://ai-task-platform-viyg.onrender.com

Demo video link:https://drive.google.com/file/d/1MKo51Av2o0dE60rZXiswLvCSkpopwNOC/view?usp=share_link

Infra repo link:https://github.com/Adity322/ai-task-infra

Docker hub:https://hub.docker.com/u/adityadev10311

Architecture Document link: https://drive.google.com/file/d/1e_A8O0YaIySZaIi7HqTjgsuEB-KwArX_/view?usp=share_link

---


## ✨ Features

- User registration and login with JWT authentication
- Create AI tasks with title, input text, and operation
- Asynchronous task processing via Redis queue
- Real-time task status tracking (pending → running → success/failed)
- View task logs and results
- Deployed on Render with Docker containers

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + Tailwind CSS |
| Backend API | Node.js + Express |
| Worker | Python |
| Database | MongoDB Atlas |
| Queue | Redis (Upstash) |
| Containerization | Docker + Docker Compose |
| Orchestration | Kubernetes (k3s) |
| GitOps | Argo CD |
| CI/CD | GitHub Actions |

---

## 🏗 Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│   MongoDB   │
│  React/Vite │     │ Node/Express│     │   Atlas     │
└─────────────┘     └──────┬──────┘     └─────────────┘
                           │
                    ┌──────▼──────┐
                    │    Redis    │
                    │  (Upstash)  │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐     ┌─────────────┐
                    │   Worker    │────▶│   MongoDB   │
                    │   (Python)  │     │   Atlas     │
                    └─────────────┘     └─────────────┘
```

**Request Flow:**
1. User submits task via React frontend
2. Backend saves task to MongoDB with status `pending`
3. Backend pushes task ID to Redis queue
4. Python worker picks up task via blocking pop (`brpop`)
5. Worker updates status to `running`, processes text, updates to `success` or `failed`
6. Frontend auto-refreshes every 3 seconds to show live status

---

## ✅ Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org/) 
- [Python](https://www.python.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)
- [Redis](https://redis.io/) (or use Upstash free tier)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier)

---

## 🚀 Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/Adity322/ai-task-platform.git
cd ai-task-platform
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create `.env` file in `backend/`:
```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
REDIS_URL=your_redis_url
PORT=8000
```

Start the backend:
```bash
node server.js
```

Backend runs on: `http://localhost:8000`

---

### 3. Setup Worker

```bash
cd worker
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env` file in `worker/`:
```env
MONGO_URI=your_mongodb_atlas_connection_string
REDIS_URL=your_redis_url
```

Start the worker:
```bash
python worker.py
```

---

### 4. Setup Frontend

```bash
cd frontend
npm install
```

Create `.env` file in `frontend/`:
```env
VITE_API_URL=http://localhost:8000/api
```

Start the frontend:
```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

### 5. Run All Services Together

You need **3 terminals** running simultaneously:

| Terminal | Directory | Command |
|----------|-----------|---------|
| 1 | `backend/` | `node server.js` |
| 2 | `worker/` | `python worker.py` |
| 3 | `frontend/` | `npm run dev` |

---

## 🐳 Docker Setup

Run the entire stack with a single command:

```bash
# From the root of the project
docker-compose up --build
```

This starts:
- Frontend on `http://localhost:80`
- Backend on `http://localhost:8000`
- Worker (background)
- MongoDB on port `27017`
- Redis on port `6379`

To stop:
```bash
docker-compose down
```

To stop and remove volumes:
```bash
docker-compose down -v
```

---

## ☸️ Kubernetes Deployment

### Prerequisites
- [kubectl](https://kubernetes.io/docs/tasks/tools/) installed
- [Minikube](https://minikube.sigs.k8s.io/) or k3s running
- [Argo CD](https://argo-cd.readthedocs.io/) installed

### 1. Clone the infra repository

```bash
git clone https://github.com/Adity322/ai-task-infra.git
cd ai-task-infra
```

### 2. Update image tags

Replace `your-dockerhub-username` with `adityadev10311` in all deployment files.

### 3. Update secrets

Encode your values in base64:
```bash
echo -n "your-mongo-uri" | base64
echo -n "your-jwt-secret" | base64
```

Update `secret.yaml` with encoded values.

### 4. Apply manifests

```bash
# Create namespace
kubectl apply -f namespace.yaml

# Apply config and secrets
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml

# Deploy services
kubectl apply -f mongodb/
kubectl apply -f redis/
kubectl apply -f backend/
kubectl apply -f worker/
kubectl apply -f frontend/

# Apply ingress
kubectl apply -f ingress.yaml
```

### 5. Verify deployment

```bash
kubectl get pods -n ai-task-platform
kubectl get services -n ai-task-platform
```

### 6. Setup Argo CD

```bash
# Install Argo CD
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Access Argo CD UI
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

Create an Argo CD application pointing to `https://github.com/Adity322/ai-task-infra` with auto-sync enabled.

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens | `mysecretkey123` |
| `REDIS_URL` | Redis connection URL | `rediss://...` |
| `PORT` | Backend server port | `8000` |

### Worker (`worker/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `REDIS_URL` | Redis connection URL | `rediss://...` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000/api` |

---

## 📡 API Documentation

### Auth Routes

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "Aditya Kumar",
  "email": "aditya@example.com",
  "password": "password123"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "aditya@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGc...",
  "user": { "id": "...", "name": "...", "email": "..." }
}
```

---

### Task Routes

> All task routes require `Authorization: Bearer <token>` header

#### Create Task
```
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Task",
  "inputText": "Hello World",
  "operation": "uppercase"
}

Supported operations: uppercase | lowercase | reverse | wordcount
```

#### Get All Tasks
```
GET /api/tasks
Authorization: Bearer <token>
```

#### Get Task by ID
```
GET /api/tasks/:id
Authorization: Bearer <token>
```

---

## 📁 Project Structure

```
ai-task-platform/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── redisClient.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── taskController.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── taskRoutes.js
│   │   └── app.js
│   ├── server.js
│   ├── Dockerfile
│   └── package.json
├── worker/
│   ├── worker.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── routes/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml
└── README.md
```

---

## 🌐 Live Deployment

| Service | URL |
|---------|-----|
| Frontend | https://ai-task-frontend-zf9d.onrender.com |
| Backend API | https://ai-task-platform-viyg.onrender.com |
| Worker | https://ai-task-platform-1-zj4f.onrender.com |

> ⚠️ **Note:** Services are hosted on Render's free tier and may take 30-60 seconds to wake up after inactivity.

---

## 👨‍💻 Author

**Aditya Kumar Singh**
- GitHub: [@Adity322](https://github.com/Adity322)
- Docker Hub: [adityadev10311](https://hub.docker.com/u/adityadev10311)
