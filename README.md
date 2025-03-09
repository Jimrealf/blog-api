# Blog API

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

## Note: Tests are a work in progress—some may fail due to setup issues.


# Notes
This is a practice project—not deployed, meant for local use.
Future improvements: Fix tests, add more endpoints (e.g., user profile), deploy to Render.


# License
MIT License—feel free to use or modify!# blog-api
