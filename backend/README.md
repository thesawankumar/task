Task Manager API

This project is a Task Manager API built with Node.js and Express. It allows users to manage tasks, including creating, updating, deleting, and retrieving tasks. The API also includes user authentication features.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [License](#license)

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory:

   ```
   cd backend
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add the required environment variables (see below).

## Environment Variables

The following environment variables are required:

- `PORT`: The port on which the server will run (default is 5000).
- `MONGO_URI`: The MongoDB connection string.
- `JWT_SECRET`: Secret key for signing JSON Web Tokens.
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name for image storage.
- `CLOUDINARY_API_KEY`: Cloudinary API key.
- `CLOUDINARY_API_SECRET`: Cloudinary API secret.

## API Endpoints

### Authentication

- **POST** `/api/auth/signup`: Create a new user.
- **POST** `/api/auth/login`: Authenticate a user and return a token.

### Tasks

- **POST** `/api/tasks/create`: Create a new task (requires authentication).
- **GET** `/api/tasks/all`: Retrieve all tasks for the authenticated user (requires authentication).
- **PUT** `/api/tasks/:id`: Update a task by ID (requires authentication).
- **DELETE** `/api/tasks/:id`: Delete a task by ID (requires authentication).

## Usage

1. Start the server:

   ```
   npm run dev
   ```

2. Use a tool like Postman or cURL to interact with the API endpoints.

## License

This project is licensed under the MIT License.
