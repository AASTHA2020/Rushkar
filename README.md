# Employee Listing System

A full-stack web application for managing employee information with a modern React frontend and Node.js backend.

## Project Structure

The project is divided into two main directories:

### Frontend (`/frontend`)

- Built with React and JavaScript (JSX)
- Uses Material-UI (MUI) for the component library
- Implements modern React practices with functional components
- Features a responsive and user-friendly interface
- Uses React Router for navigation
- Implements Material-UI theming

### Backend (`/backend`)

- Node.js with Express.js server
- MongoDB database with Mongoose ODM
- RESTful API architecture
- Includes data seeding functionality

## Tech Stack

### Frontend

- React 19
- JavaScript (JSX)
- Material-UI (MUI) v7
- React Router DOM v7
- Axios for API calls
- Lodash for utility functions
- Emotion for styled components

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- CORS for cross-origin requests
- Dotenv for environment variables
- Faker for data seeding

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd Rushkar_Assignment
```

2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

### Environment Setup

1. Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee-listing
```

### Running the Application

1. Start the Backend Server

```bash
cd backend
npm start
```

2. (Optional) Seed the Database with Sample Data

```bash
cd backend
npm run seed
```

3. Start the Frontend Development Server

```bash
cd frontend
npm start
```

The application will be available at:

- Backend API: http://localhost:5000

## Features

- Employee listing and management
- Search and filter functionality
- Responsive design
- Data persistence
- RESTful API endpoints

## API Endpoints

The backend provides the following RESTful endpoints:

- GET /api/employees - Get all employees
- GET /api/employees/:id - Get employee by ID

## Development

### Frontend Development

- Located in `/frontend/src`
- Components are organized in the `components` directory
- API services are in the `services` directory
- Utility functions in the `utils` directory

### Backend Development

- Located in `/backend/src`
- Routes are defined in the `routes` directory
- Database models in the `models` directory
- Seeding scripts in the `scripts` directory


