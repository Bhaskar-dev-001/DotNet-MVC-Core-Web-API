# Task Manager - Full Stack Setup Guide

This guide will help you set up and run the complete Task Manager application with both the .NET backend and React frontend.

## Project Structure

```
DotNet-MVC-Core-Web-API/
├── MVC_WEB_API/
│   └── TaskaManager/          # .NET Core Backend
│       ├── Program.cs
│       ├── Controllers/
│       ├── Services/
│       ├── Models/
│       └── ...
├── TaskManager-Frontend/      # React Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
└── README.md
```

## Prerequisites

- **.NET SDK 8.0+** or higher
- **Node.js 16+** and npm
- **SQLite** (usually included with .NET)

## Backend Setup (.NET)

### 1. Navigate to Backend Directory

```bash
cd MVC_WEB_API/TaskaManager
```

### 2. Restore Dependencies

```bash
dotnet restore
```

### 3. Apply Database Migrations

```bash
dotnet ef database update
```

This will create/update the SQLite database with the necessary tables.

### 4. Run the Backend

```bash
dotnet run
```

The backend will start on `http://localhost:5000`

**Expected Output:**
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:7000
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
```

## Frontend Setup (React)

### 1. Open a New Terminal and Navigate to Frontend Directory

```bash
cd TaskManager-Frontend
```

### 2. Install Dependencies (if not already done)

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

**Expected Output:**
```
VITE v8.0.10  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

## Running Both Simultaneously

**Terminal 1 - Backend:**
```bash
cd MVC_WEB_API/TaskaManager
dotnet run
```

**Terminal 2 - Frontend:**
```bash
cd TaskManager-Frontend
npm run dev
```

Then open your browser to `http://localhost:5173`

## Usage

### 1. Register a New Account
- Click "Sign up here" on the login page
- Fill in username, email, and password
- Click "Sign Up"

### 2. Login
- Enter your credentials
- Click "Sign In"
- You'll be redirected to the dashboard

### 3. Manage Tasks
- **Create**: Enter task title in the form and click "+ Add Task"
- **Complete**: Click the checkbox to mark tasks as done
- **Edit**: Click "Edit" button and save changes
- **Delete**: Click "Delete" to remove a task

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
  ```json
  {
    "userName": "string",
    "email": "string",
    "password": "string"
  }
  ```
  
- `POST /api/auth/login` - Login user
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

### Tasks
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
  ```json
  {
    "title": "string"
  }
  ```
  
- `PUT /api/tasks/{id}` - Update task
  ```json
  {
    "title": "string"
  }
  ```
  
- `DELETE /api/tasks/{id}` - Delete task
- `PUT /api/tasks/{id}/toggle` - Toggle task completion status

## Authentication

The frontend uses JWT (JSON Web Token) authentication:
- Tokens are obtained upon login/registration
- Tokens are stored in localStorage
- Tokens are automatically included in all API requests
- Expired or invalid tokens redirect to login

## Database

The backend uses SQLite for data storage. The database file is located at:
```
MVC_WEB_API/TaskaManager/tasks.db
```

### Database Tables

**Users Table:**
```sql
- Id (INTEGER, PRIMARY KEY)
- UserName (TEXT)
- Email (TEXT)
- PasswordHash (TEXT)
- Role (TEXT)
- CreatedAt (TEXT)
```

**Tasks Table:**
```sql
- Id (INTEGER, PRIMARY KEY)
- Title (TEXT)
- CreatedDate (TEXT)
- IsCompleted (INTEGER - boolean)
```

## Development

### Frontend Build for Production

```bash
cd TaskManager-Frontend
npm run build
```

Output will be in the `dist/` folder.

### Backend Build for Production

```bash
cd MVC_WEB_API/TaskaManager
dotnet publish -c Release
```

## Troubleshooting

### Backend Won't Start
- Ensure port 5000 is not in use: `lsof -i :5000`
- Check that .NET SDK is installed: `dotnet --version`
- Ensure database migrations are applied: `dotnet ef database update`

### Frontend Won't Start
- Ensure port 5173 is not in use: `lsof -i :5173`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 16+)

### CORS Errors
- Ensure backend is running before frontend
- Check that React app is on `http://localhost:5173`
- Verify CORS configuration in backend's Program.cs

### Login Fails
- Check that backend is running
- Verify user exists in database
- Check JWT configuration in appsettings.json

## Environment Variables

### Backend (appsettings.json)

The backend uses configuration from `appsettings.json` and `appsettings.Development.json`:
- JWT settings (Key, Issuer, Audience)
- Database connection string
- Logging levels

### Frontend (.env)

Optional environment file for the frontend (create if needed):
```
VITE_API_URL=http://localhost:5000/api
```

## Additional Commands

### Backend
```bash
# Run migrations
dotnet ef migrations add MigrationName
dotnet ef database update

# Watch for changes
dotnet watch run
```

### Frontend
```bash
# Preview production build
npm run preview

# Lint code
npm run lint
```

## Notes

- The frontend automatically proxies API requests to the backend
- CORS is enabled for `localhost:5173` and `localhost:3000`
- Database is automatically created on first run
- Password hashing is handled by the backend using ASP.NET Core Identity

## Support

For issues or questions, check the README files in both backend and frontend directories.

## License

MIT
