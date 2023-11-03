# JWT Authentication & Authorization

- Goal: build a Fullstack PERN app using JsonWebTokens to Authenticate/Authorize from scratch...

- Completed:

  - Database (PostgreSQL)
    - stores a table of Users (id, email, hashed password)
  - Backend (TypeScript Node Express API)
  - `/api/auth/register` (POST) and `/api/auth/login` (POST)
    - creates JsonWebTokens and sends them to the Frontend
    - Middleware `verifyToken` to enable protected API routes
  - Frontend (TypeScript React)
    - fetches from the Backend API to register or login
    - uses JsonWebTokens to Authenticate/Authorize
    - JsonWebTokens persist in localStorage
    - uses React Context/ContextProvider

- To Add:

  - Database:
    - Roles for Users (with a default) to explore Permissions
  - Backend
    - Protected API Routes using Middleware
    - Salt the passwords
    - Use Roles to setup Role Based Auth
  - Frontend
    - Routes with Route Protection (react-router-dom)
    - Test Roles on the Frontend
