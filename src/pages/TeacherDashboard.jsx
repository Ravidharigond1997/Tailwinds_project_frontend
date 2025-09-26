import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments } from "../store/assignmentSlice";
import api from "../utils/api";
import AssignmentTable from "../components/AssignmentTable";
import CreateAssignmentDialog from "../components/CreateAssignmentDialog";

const TeacherDashboard = () => {
  const dispatch = useDispatch();
  const assignments = useSelector(s => s.assignments.assignments);
  const [open, setOpen] = useState(false);

  const fetchAssignments = async () => {
    const res = await api.get("/api/assignments?page=1&limit=5");
    dispatch(setAssignments(res.data.assignments));
  };

  useEffect(() => { fetchAssignments(); }, []);

  const handleCreate = async (data) => {
    const res = await api.post("/api/assignments", data);
    dispatch(setAssignments([res.data.assignment, ...assignments]));
    setOpen(false);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5">Teacher Dashboard</Typography>
      <Button variant="contained" sx={{ mt: 2, mb: 2 }} onClick={() => setOpen(true)}>Create Assignment</Button>
      <AssignmentTable assignments={assignments} role="teacher" />
      <CreateAssignmentDialog open={open} onClose={() => setOpen(false)} onCreate={handleCreate} />
    </Box>
  );
};

export default TeacherDashboard;
