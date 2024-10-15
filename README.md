# Connect Space

A modern educational platform designed to facilitate learning and community engagement. This project includes a robust backend API and a responsive frontend application, enabling users to register, login, and interact within communities.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Future Enhancements](#future-enhancements)
- [Lessons Learned](#lessons-learned)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure user registration and login with JWT authentication.
- **Community Management**: Users can view, join, and participate in communities.
- **Admin Dashboard**: Admins can manage communities, view analytics, and post announcements.
- **Payment Integration**: Premium features with Stripe payment gateway integration.

## Tech Stack

- **Frontend**: React, CSS
- **Backend**: NestJS, Prisma, MongoDB
- **Authentication**: JWT
- **Payment Gateway**: Stripe

## Getting Started

To get a local copy of this project up and running, follow these steps.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bereket-kume/portfolio-project-specialization
   cd connect-space

    Navigate to the backend directory:

    bash

cd edu-platform-api

Install the backend dependencies:

bash

npm install

Navigate to the frontend directory:

bash

cd ../edu-platform-frontend

Install the frontend dependencies:

bash

    npm install

    Set up environment variables for the backend (e.g., database connection string, JWT secret).

Usage

    Start the backend server:

    bash

cd edu-platform-api
npm run start

Start the frontend application:

bash

    cd ../edu-platform-frontend
    npm start

    Open your web browser and navigate to http://localhost:5173 to view the application.

API Documentation

The backend API is documented with Swagger. To access the documentation:

    Start the backend server.
    Navigate to http://localhost:3000/api in your browser.

Future Enhancements

    User registration and profile management.
    Role-based access control for better security.
    Scheduling meetings and sending emails to community members.
    Improved frontend design for a better user experience.

Lessons Learned

    Successfully integrated a third-party service (Stripe) with the application.
    Gained experience in iterative development and agile methodologies.
    Importance of defining clear requirements before starting development.

Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.
License

This project is licensed under the MIT License. See the LICENSE file for details.

Thank you for checking out the Connect Space project! For any inquiries, please contact [bereketkume@gmail.com] or visit my GitHub profile.
