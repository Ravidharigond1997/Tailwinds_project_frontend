import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import { useSelector } from "react-redux";

const App = () => {
  const { isLoggedIn, user } = useSelector(state => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/teacher" element={isLoggedIn && user.role==="teacher" ? <TeacherDashboard /> : <Navigate to="/auth" />} />
        <Route path="/student" element={isLoggedIn && user.role==="student" ? <StudentDashboard /> : <Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
