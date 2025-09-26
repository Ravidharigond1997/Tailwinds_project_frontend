📘 Frontend – Assignment Management System

This is the frontend of the Assignment Management System built with:

React.js – UI library

Redux Toolkit – state management

Axios – API communication

Material UI (MUI) – styling and components

JWT Authentication – role-based login (teacher / student)

🚀 Features
🔑 Authentication

Single Login / Register page with role selection (teacher / student)

JWT token stored in localStorage

Role-based redirection:

Teacher → Teacher Dashboard

Student → Student Dashboard

📚 Teacher Dashboard

Create assignments (title, description, due date, status)

Manage assignment lifecycle: Draft → Published → Completed

View student submissions in table format

Filter assignments by status

🎓 Student Dashboard

View only Published assignments

Submit answers (only once per assignment)

View submitted answers

Cannot edit submission after submission

🎨 UI / Styling

Material UI components

Custom reusable TextField input component

Responsive layout

⚙️ Installation

Clone the repo and install dependencies:

# clone repo
git clone https://github.com/yourusername/frontend-assignment-system.git
cd frontend-assignment-system

# install deps
npm install

▶️ Running the App
# start dev server
npm run dev


Frontend will run at:
👉 http://localhost:5173 (Vite)
or
👉 http://localhost:3000 (CRA, if used)

🔗 API Connection

The frontend expects a backend server running (see backend README).
By default, the API base URL is set in src/utils/api.js:

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Backend API
});

export default api;


Update if your backend runs on another host/port.

🏗️ Project Structure
frontend/
│── src/
│   ├── components/
│   │   ├── AuthPage.jsx         # Login & Register tabs
│   │   ├── AssignmentTable.jsx  # Reusable table (teacher/student view)
│   │   ├── CustomTextField.jsx  # Common textfield component
│   ├── store/
│   │   ├── authSlice.js         # Authentication slice
│   │   ├── assignmentSlice.js   # Assignment slice
│   │   └── store.js             # Redux store setup
│   ├── utils/
│   │   └── api.js               # Axios instance
│   ├── pages/
│   │   ├── TeacherDashboard.jsx
│   │   └── StudentDashboard.jsx
│   └── App.jsx                  # Routes + Role based rendering
│
└── package.json

🧪 Example Workflows
Register User

Fill Name, Email, Password, Role

Click Register → API: POST /user/register

Login User

Enter Email + Password

If success → JWT token stored → Redirect to role dashboard

Teacher

Create an assignment (default status = Draft)

Change status → Published → Completed

View all student submissions

Student

See only Published assignments

Submit one answer per assignment

✅ Requirements

Node.js (>=16)

Backend API running (MongoDB connected)

📌 TODO

Add dark mode toggle

Improve error UI (Snackbars)

Add form validation with Yup
