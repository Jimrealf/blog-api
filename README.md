# Blog API with Bcrypt

A RESTful API for a simple blog, built with Node.js, Express, PostgreSQL, and JWT authentication. This is a practice project to learn backend development, including user authentication, CRUD operations, and API documentation with Swagger.

## Features
- **Users**: Register and login with hashed passwords (using `bcrypt`).
- **Posts**: Create, read, update, and delete posts (authenticated users only for write operations).
- **Comments**: Add and delete comments (public for adding, post author for deleting).
- **Authentication**: JWT tokens for secure access.
- **Database**: PostgreSQL with `SERIAL` IDs.
- **Documentation**: Swagger UI for testing endpoints.

## Tech Stack
- **Node.js & Express**: Backend framework.
- **PostgreSQL**: Database with `pg` client.
- **JWT**: Token-based authentication.
- **Bcrypt**: Password hashing.
- **Swagger**: API documentation.
- **Jest & Supertest**: Unit tests (in progress).

## Setup Instructions
### Prerequisites
- Node.js (v16+ recommended)
- PostgreSQL (installed and running)
- Git

Server runs on http://localhost:3000.

Explore the API:
Open http://localhost:3000/api-docs in your browser for Swagger UI.

API Endpoints
Method	Endpoint	Description	Auth Required?
POST	/api/users/register	Register a new user	No
POST	/api/users/login	Login and get JWT token	No
GET	/api/posts	List published posts	No
POST	/api/posts	Create a post	Yes
PUT	/api/posts/:id	Update a post	Yes (owner)
DELETE	/api/posts/:id	Delete a post	Yes (owner)
POST	/api/comments	Add a comment	No
GET	/api/comments/post/:postId	List comments for a post	No
DELETE	/api/comments/:id	Delete a comment	Yes (post owner)


Note: Tests are a work in progress—some may fail due to setup issues.


# Project Structure

blog-api/
├── __tests__/         # Unit tests
├── controllers/       # Route handlers
├── routes/            # API routes
├── swagger.yaml       # Swagger API spec
├── db.js              # Database connection
├── server.js          # Main app
├── .gitignore         # Git ignore file
├── package.json       # Dependencies
└── README.md          # This file


# Notes
This is a practice project—not deployed, meant for local use.
Future improvements: Fix tests, add more endpoints (e.g., user profile), deploy to Render.


# License
MIT License—feel free to use or modify!# blog-api
