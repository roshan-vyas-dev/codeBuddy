# CodeBuddy — Peer Code Review Platform

CodeBuddy is a full-stack MERN application that helps developers share code snippets, receive AI-powered code reviews, and get feedback from other developers.

The platform combines AI-assisted code review, peer feedback, reputation points, authentication, and admin management in one developer-focused application.

## Live Demo

Live Application: https://code-buddy-gules-eight.vercel.app/

GitHub Repository: https://github.com/roshan-vyas-dev/codeBuddy

## Features

### User Features

* User registration and login
* JWT-based authentication
* Protected routes
* Create code snippets
* View all code snippets
* Search snippets
* Filter snippets by programming language
* View snippet details
* Edit and delete own snippets
* Add, edit, and delete comments
* User profile
* Reputation system
* Like/unlike snippets
* AI-powered code review
* Responsive user interface
* Loading states and user-friendly error messages

### AI Code Review

CodeBuddy integrates the Groq API to provide instant AI-powered feedback on submitted code.

The AI reviewer can:

* Identify potential bugs
* Suggest improvements
* Explain problems clearly
* Review code quality
* Provide developer-focused recommendations

### Admin Features

Admins have a separate protected dashboard where they can:

* View platform statistics
* Manage users
* Block users
* Unblock users
* Delete users
* Manage snippets
* Manage comments
* Access protected admin routes
* Log out securely

Blocked users are prevented from logging in, and protected backend APIs also verify whether an account has been blocked.

## Reputation System

CodeBuddy includes a reputation system to encourage useful community participation.

When a user receives a like on their snippet:

```text
Snippet receives a like
        |
        v
Snippet points +1
        |
        v
Author reputation +1
```

When a like is removed, the corresponding points and reputation are decreased.

## Authentication and Authorization

CodeBuddy uses JWT authentication for secure user sessions.

The authentication flow:

```text
User Login
    |
    v
Backend validates credentials
    |
    v
JWT token generated
    |
    v
Frontend stores authentication data
    |
    v
Protected requests include Bearer token
    |
    v
Backend verifies token
    |
    v
User access granted
```

The application also implements role-based authorization for admin functionality.

```text
User
 |
 +-- Normal application access

Admin
 |
 +-- Admin dashboard
      |
      +-- Manage Users
      +-- Manage Snippets
      +-- Manage Comments
```

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Groq SDK

### AI

* Groq API
* Llama model

### Deployment

* Vercel — Frontend
* Render — Backend
* MongoDB Atlas — Database

## Project Structure

```text
codeBuddy/
|
+-- backend/
|   +-- config/
|   +-- controllers/
|   +-- middleware/
|   +-- models/
|   +-- routes/
|   +-- seed/
|   +-- services/
|   +-- utils/
|   +-- server.js
|   +-- package.json
|
+-- frontend/
|   +-- src/
|       +-- components/
|       +-- layouts/
|       +-- pages/
|       +-- ...
|   +-- package.json
|
+-- .gitignore
+-- README.md
```

## Application Flow

### AI Code Review

```text
Developer
    |
    v
Creates Code Snippet
    |
    v
Snippet stored in MongoDB
    |
    v
AI Review requested
    |
    v
Backend sends code to Groq API
    |
    v
AI analyzes the code
    |
    v
Review returned to frontend
```

### Peer Review

```text
Developer posts snippet
        |
        v
Other developers view snippet
        |
        v
Users leave comments
        |
        v
Snippet receives likes
        |
        v
Author earns reputation
```

## Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/roshan-vyas-dev/codeBuddy.git
cd codeBuddy
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
ADMIN_NAME=your_admin_name
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a frontend `.env` file:

```env
VITE_API_URL=your_backend_api_url
```

Start the frontend:

```bash
npm run dev
```

## Environment Variables

### Backend

| Variable         | Purpose                   |
| ---------------- | ------------------------- |
| `MONGO_URI`      | MongoDB Atlas connection  |
| `JWT_SECRET`     | JWT authentication secret |
| `GROQ_API_KEY`   | Groq API authentication   |
| `ADMIN_EMAIL`    | Admin account email       |
| `ADMIN_PASSWORD` | Admin account password    |
| `ADMIN_NAME`     | Admin account name        |

### Frontend

| Variable       | Purpose              |
| -------------- | -------------------- |
| `VITE_API_URL` | Backend API base URL |

Never commit `.env` files or secret API keys to GitHub.

## Testing

The application was tested across both user and admin functionality.

### User Testing

* Registration
* Duplicate email and username validation
* Login and logout
* Protected routes
* Snippet CRUD
* Search and language filtering
* Comments
* Profile
* AI code review
* Loading states
* Error handling

### Admin Testing

* Admin login and redirect
* Admin dashboard
* User management
* Block/unblock users
* User deletion
* Snippet management
* Comment management
* Admin logout

### Production Testing

The deployed application was tested after connecting:

```text
Vercel Frontend
       |
       v
Render Backend
       |
       v
MongoDB Atlas
```

## Deployment

CodeBuddy is deployed using:

```text
Frontend  -> Vercel
Backend   -> Render
Database  -> MongoDB Atlas
```

The production frontend communicates with the deployed backend through the `VITE_API_URL` environment variable.

## Screenshots

Screenshots of the application can be added here to demonstrate the main features.

Recommended screenshots:

* Home page
* Dashboard
* Create Snippet
* Snippet Details
* AI Code Review
* Profile
* Admin Dashboard
* Manage Users

Example project structure:

```text
docs/
└── screenshots/
    ├── home.png
    ├── dashboard.png
    ├── ai-review.png
    ├── profile.png
    └── admin-dashboard.png
```

## Future Improvements

Possible future improvements include:

* Real-time notifications
* Code review discussion threads
* Advanced snippet search
* Email notifications
* Password reset functionality
* More detailed reputation and achievement systems
* Additional AI review options
* Automated testing and CI/CD
* Support/contact system for blocked accounts

## Author

Roshan Vyas

MERN Stack Developer

CodeBuddy was built to demonstrate full-stack development skills including authentication, authorization, REST APIs, MongoDB, AI integration, and production deployment.

