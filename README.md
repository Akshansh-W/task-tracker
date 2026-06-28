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
