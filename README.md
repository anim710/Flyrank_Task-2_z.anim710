# Task API (v2.0)

A lightweight RESTful API for task management built with **Node.js**, **Express**, and **SQLite**.

---

## 📌 Features

- **Full CRUD Operations**: Create, read, update, and delete tasks.
- **SQLite Persistence**: Embedded database using standard file-based storage (`tasks.db`).
- **Interactive Documentation**: Integrated Swagger UI served via OpenAPI specifications.
- **Layered Architecture**: Clean separation of concerns across Routes, Services, Repositories, and Middleware.
- **Global Error Handling**: Standardized error responses (`BadRequestError`, `NotFoundError`).

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/](https://github.com/)<your-username>/Task-api-2.git
   cd Task-api-2



   ## 📖 API Reference

### Base URL
`http://localhost:3000`

### Endpoints Overview

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/tasks` | Retrieve all tasks | No |
| `GET` | `/tasks/:id` | Retrieve a single task by ID | No |
| `POST` | `/tasks` | Create a new task | No |
| `PUT` | `/tasks/:id` | Update a task (title/status) | No |
| `DELETE` | `/tasks/:id` | Delete a task by ID | No |