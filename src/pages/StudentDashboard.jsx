import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments } from "../store/assignmentSlice";
import api from "../utils/api";
import AssignmentTable from "../components/AssignmentTable";

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const assignments = useSelector(s => s.assignments.assignments);

  const fetchAssignments = async () => {
    const res = await api.get("/assignment"); // backend filters only Published
    dispatch(setAssignments(res.data.assignments));
  };

  useEffect(() => { fetchAssignments(); }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5">Student Dashboard</Typography>
      <AssignmentTable assignments={assignments} role="student" />
    </Box>
  );
};

export default StudentDashboard;
