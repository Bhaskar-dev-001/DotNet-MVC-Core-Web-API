# Task Manager Frontend

A modern React web application for managing tasks with authentication and a beautiful UI.

## Features

- ✅ User Authentication (Register & Login)
- ✅ Task Management (Create, Read, Update, Delete)
- ✅ Task Status Tracking
- ✅ Real-time Updates
- ✅ Responsive Design
- ✅ Form Validation
- ✅ State Management with Zustand

## Tech Stack

- **React 19** - UI Framework
- **Vite** - Build tool
- **React Router v7** - Routing
- **Tailwind CSS** - Styling
- **Zustand** - State Management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client

## Project Structure

```
src/
├── components/        # Reusable components
│   ├── Header.jsx
│   ├── ProtectedRoute.jsx
│   ├── TaskItem.jsx
│   └── TaskList.jsx
├── pages/            # Page components
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   └── DashboardPage.jsx
├── services/         # API integration
│   └── api.js
├── store/            # State management
│   └── index.js
├── utils/            # Utility functions
│   ├── validation.js
│   └── dateUtils.js
├── hooks/            # Custom hooks
│   └── useFormValidation.js
├── styles/           # Global styles
│   └── index.css
├── App.jsx          # Main App component
└── main.jsx         # Entry point
```

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd TaskManager-Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

### Configuration

The API proxy is configured to forward requests to the backend at `http://localhost:5000/api`

Update the proxy configuration in `vite.config.js` if your backend is running on a different URL.

## API Integration

The frontend communicates with the backend API through the `services/api.js` module:

- **Auth Endpoints:** `/auth/register`, `/auth/login`
- **Task Endpoints:** `/tasks` (GET, POST), `/tasks/{id}` (PUT, DELETE)

## Authentication

- Tokens are stored in localStorage
- Bearer token is automatically added to all requests
- Invalid tokens redirect to login page

## Validation

- Login/Register forms use Zod for schema validation
- Real-time validation feedback
- Password confirmation on registration

## State Management

Zustand stores handle:
- User authentication state
- Task CRUD operations
- Loading and error states

## Styling

Tailwind CSS provides:
- Responsive design
- Modern color scheme
- Custom form styling with @tailwindcss/forms

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT
