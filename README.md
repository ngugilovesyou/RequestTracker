#  Request Tracker

A full-stack request management application built with **React + Vite** on the frontend and **Flask** on the backend. Track and manage user requests, feedback, and support tickets efficiently with real-time status updates.

##  Features

-  **Submit Requests** - Users can submit requests with details like type, priority, and description
-  **View All Requests** - Browse all submitted requests in a clean, organized list
-  **Filter by Status** - Filter requests by their current status (New, In Review, Resolved, Rejected)
-  **Update Status** - Change request status with a single click
-  **Modern UI** - Clean, responsive design with Tailwind CSS
-  **Toast Notifications** - Real-time feedback for all actions

##  Tech Stack

### Frontend
- **React 19** - UI Library
- **Vite** - Build tool and development server
- **Tailwind CSS 4** - Styling
- **React Toastify** - Toast notifications

### Backend
- **Flask** - Web framework
- **SQLAlchemy** - ORM
- **SQLite** - Database (development)
- **Flask-CORS** - Cross-origin resource sharing
- **Flask-Migrate** - Database migrations

##  Project Structure
``` bash
RequestTracker/
├── client/ # React + Vite frontend
│ ├── public/
│ │ ├── assets/ # Static assets
│ │ └── favicon.svg
│ ├── src/
│ │ ├── components/
│ │ │ ├── RequestForm.jsx # Request submission form
│ │ │ └── RequestList.jsx # Request list with filtering
│ │ ├── api.js # API service layer
│ │ ├── App.jsx # Main application component
│ │ └── main.jsx # Application entry point
│ ├── index.html
│ ├── package.json
│ ├── vite.config.js
│ └── eslint.config.js
│
├── server/ # Flask backend
│ ├── instance/
│ │ └── requests.db # SQLite database
│ ├── migrations/ # Database migrations
│ ├── models/
│ │ ├── init.py
│ │ └── request.py # Request model
│ ├── app.py # Main Flask application
│ ├── config.py # Configuration and extensions
│ ├── requirements.txt
│ ├── Pipfile
│ └── Pipfile.lock
│
└── .gitignore

```


## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **pip** (Python package manager)

### 1. Clone the Repository

```bash
git clone git@github.com:ngugilovesyou/RequestTracker.git
cd RequestTracker

```

### 2. Backend Setup (Flask)

cd server

``` bash
# Create and activate virtual environment
python -m venv venv

# On macOS/Linux:
source venv/bin/activate

# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Or if using Pipenv:
# pip install pipenv
# pipenv install
# pipenv shell
```

### 3. Initialize the Database
``` bash
# Initialize migrations (first time only)
flask db init

# Create the migration
flask db migrate -m "Initial migration"

# Apply the migration to create database tables
flask db upgrade
```
### 4. Run the Backend Server
``` bash
python app.py
```
The server will run at http://localhost:5000


### 5. Frontend Setup (React + Vite)
Open a new terminal window:

``` bash
cd client
```
### Install dependencies
``` bash
npm install
```
### 6. Run the Frontend Development Server
``` bash
npm run dev
```
The application will run at http://localhost:5173

