import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments } from "../store/assignmentSlice";
import { logout } from "../store/authSlice"; 
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import AssignmentTable from "../components/AssignmentTable";

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const assignments = useSelector((s) => s.assignments.assignments);

  const fetchAssignments = async () => {
    try {
      const res = await api.get("/api/assignments"); 
      dispatch(setAssignments(res.data.assignments));
    } catch (err) {
      console.error("Error fetching assignments:", err);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    dispatch(logout()); 
    navigate("/login"); 
  }
  
  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Student Dashboard</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <AssignmentTable assignments={assignments} role="student" />
    </Box>
  );
};

export default StudentDashboard;