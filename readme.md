<h3>Job Portal System<h3>
A Node.js and Express based backend for a Job Portal System that allows job seekers, employers, and placement officers to interact with the platform. The application provides user authentication, job posting, job application, and application review functionalities.

<h4>Project Structure<h4>
.
├── controllers
│   ├── employerController.js
│   ├── placementOfficerController.js
│   └── studentController.js
├── middleware
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── models
│   ├── application.js
│   ├── job.js
│   └── user.js
├── routes
│   ├── employerRoutes.js
│   ├── placementOfficerRoutes.js
│   └── studentRoutes.js
├── .env.example
├── .gitignore
├── app.js
├── package.json
└── README.md

<h4>Concepts<h4>
MVC Architecture
The project follows the Model-View-Controller (MVC) architectural pattern. The models folder contains the data models (User, Job, and Application), the controllers folder contains the logic for handling HTTP requests, and the routes folder defines the API endpoints for the application.

Middleware
Middleware functions are used to process and modify requests before they reach the route handlers. In this project, middleware functions are used for user authentication and role-based access control:

authMiddleware: Validates JSON Web Tokens (JWT) to authenticate users and add their user ID to the request object.
roleMiddleware: Checks the user's role to ensure they have the required permissions to access specific routes.
User Roles
There are three user roles in the application: student, employer, and placement officer. Each role has specific permissions and access to different parts of the application:

Students can browse and apply for jobs.
Employers can post jobs and review applications.
Placement officers can access their profile and update their information.
Validation
The Express Validator library is used to validate and sanitize user input. This ensures that the data sent by clients meets the required format and helps prevent errors and security vulnerabilities.

User Authentication
JSON Web Tokens (JWT) are used for user authentication. When a user logs in, a JWT is generated, which contains their user ID. This token is sent to the client and should be included in the Authorization header for subsequent requests that require authentication

<h4>Setup<h4>
Clone the repository: git clone https://github.com/Wajahat1769/job-portal-backend.git

<h4>Install the required dependencies: npm install<h4>
Create a .env file in the project root folder and configure the following variables:
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=<your_jwt_secret>

<h4>Start the application<h4>
npm start


