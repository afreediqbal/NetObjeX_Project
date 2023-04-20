README

## Project Description

This project aims to develop a web application with two types of roles - admin and user. The admin will manage features and subscription plans, while the user will subscribe to plans, access the features, and view their usage statistics. The application will be developed using Node.js as the backend, MongoDB as the database, and HTML, CSS, and JavaScript as the frontend. Express.js will be used as the Node.js framework for developing the RESTful API.

## Technical Stack

- Backend: Node.js
- Database: MongoDB
- Frontend: HTML, CSS, JavaScript (optional: frontend framework/library like React, Angular, or Vue.js)
- API: Express.js (Node.js framework)

## Requirements

### Backend (Node.js)

- Develop a RESTful API using Express.js for CRUD operations.
- Implement role-based access control middleware.

### Database (MongoDB)

- Design the database schema for user information, feature details and subscription plans
- Use Mongoose for connecting and managing MongoDB.

### Authentication and Authorization

- Assign appropriate roles to users during registration.
- Use JSON Web Tokens (JWT) to secure API endpoints.

### User Roles

- Admin 
- User

### Admin Module

- Features CRUD operations. 
- Subscription plans CRUD operations and mapping features.

### User Module

- Plan listing and subscription. 
- Feature access. 
- Usage dashboard for tracking usage statistics.

### Security

- Implement input validation and sanitization. 
- Secure storage and transmission of user data and credentials.

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Set environment variables in a `.env` file
4. Start the server with `npm start`

## API Endpoints

### User Endpoints

- `POST /register` - User registration
- `POST /user/signin` - User signin
- `GET /user/plans` - List available plans for the user
- `PUT /user/subscribe` - Subscribe to a plan

### Admin Endpoints

- `POST /admin/register` - Admin registration
- `POST /admin/login` - Admin login
- `POST /admin/feature` - Add a feature
- `GET /admin/features` - List all features
- `PUT /admin/feature/:id` - Update a feature
- `DELETE /admin/feature/:id` - Delete a feature
- `POST /admin/plan` - Add a subscription plan
- `GET /admin/plans` - List all subscription plans
- `PUT /admin/plan/:id` - Update a subscription plan
- `DELETE /admin/plan/:id` - Delete a subscription plan

## Contributors

- [Afreed Iqbal](https://github.com/yourusername)