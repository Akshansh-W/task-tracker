# Task Tracker (MERN Stack)

A full-stack task management app built with MongoDB, Express, React, and Node.js. Create, view, update, and delete tasks with status and priority tracking, all through a REST API.

## Folder structure

```
task-tracker/
├── backend/
│   ├── config/        # MongoDB connection
│   ├── controllers/   # Request handling logic for tasks
│   ├── middleware/     # Validation + error handling
│   ├── models/         # Mongoose schema
│   ├── routes/         # Express routes
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/ # TaskForm, TaskList, TaskItem, Navbar, etc.
    │   ├── pages/       # Home.jsx
    │   ├── services/   # api.js (Axios calls)
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## Tech stack

- **Frontend:** React (Vite), Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)

## Getting started

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # then fill in your MongoDB URI
npm run dev             # starts on http://localhost:5000
```

Required environment variables (`backend/.env`):

| Variable      | Description                                  |
|---------------|-----------------------------------------------|
| `PORT`        | Port the API runs on (default 5000)            |
| `MONGO_URI`   | MongoDB connection string                      |
| `CLIENT_URL`  | URL of the frontend, used for CORS              |

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env   # then set VITE_API_URL
npm run dev             # starts on http://localhost:5173
```

Required environment variable (`frontend/.env`):

| Variable        | Description                          |
|-----------------|----------------------------------------|
| `VITE_API_URL`  | Base URL of the backend API, e.g. `http://localhost:5000/api` |

## API endpoints

| Method | Endpoint           | Description          |
|--------|--------------------|-----------------------|
| GET    | `/api/tasks`        | Get all tasks (optional `?status=` filter) |
| GET    | `/api/tasks/:id`    | Get a single task     |
| POST   | `/api/tasks`        | Create a task         |
| PUT    | `/api/tasks/:id`    | Update a task         |
| DELETE | `/api/tasks/:id`    | Delete a task          |

## Deployment notes

- Both `frontend/.env` and `backend/.env` are git-ignored — set the equivalent environment variables in your hosting provider's dashboard (e.g. Render, Railway, Vercel, Netlify) instead of committing them.
- When you deploy the backend, update `CLIENT_URL` to your deployed frontend's URL so CORS allows it.
- When you deploy the frontend, set `VITE_API_URL` to your deployed backend's URL (including the `/api` suffix) and rebuild — Vite bakes env variables in at build time.
- For the database, use a MongoDB Atlas connection string in `MONGO_URI` instead of a local instance.

## Features implemented

- Full CRUD for tasks (create, read, update, delete)
- Client-side and server-side form validation
- Status (`pending` / `in-progress` / `completed`) and priority (`low` / `medium` / `high`) tracking
- Filter tasks by status
- Optimistic, no-refresh UI updates after every action
- Responsive layout (single column on mobile, two-column on larger screens)
