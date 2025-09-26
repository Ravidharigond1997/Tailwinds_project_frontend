import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateAssignment } from "../store/assignmentSlice";
import api from "../utils/api";

const AssignmentTable = ({ assignments, role = "student" }) => {
  const dispatch = useDispatch();
  const [filterStatus, setFilterStatus] = useState("All");
  const [openSubmit, setOpenSubmit] = useState(false);
  const [activeAssignment, setActiveAssignment] = useState(null);
  const [answer, setAnswer] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  // ---------- Student: Submit Answer ----------
  const handleOpenSubmit = (assignment) => {
    setActiveAssignment(assignment);
    setAnswer(assignment.answer || "");
    setOpenSubmit(true);
  };

  const handleSubmitAnswer = async () => {
    if (!answer) return;
    const res = await api.post(`/api/assignments/${activeAssignment._id}/submit`, { answer });
    dispatch(updateAssignment(res.data.assignment));
    setOpenSubmit(false);
  };

  const handleOpenEdit = (assignment) => {
    setActiveAssignment(assignment);
    setNewStatus(assignment.status);
    setOpenEdit(true);
  };

  const handleUpdateStatus = async () => {
    if (!newStatus) return;
    try {
      const res = await api.patch(
        `/api/assignments/${activeAssignment._id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Token from localStorage
          },
        }
      );
      dispatch(updateAssignment(res.data.assignment));
      setOpenEdit(false);
    } catch (err) {
      console.error("Error updating status:", err.response?.data || err.message);
    }
  };

  const filteredAssignments = assignments.filter((a) =>
    filterStatus === "All" ? true : a.status === filterStatus
  );

  return (
    <>
      {role === "teacher" && (
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Draft">Draft</MenuItem>
          <MenuItem value="Published">Published</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              {role === "teacher" && <TableCell>Last Submission</TableCell>}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAssignments.map((a) => (
              <TableRow key={a._id}>
                <TableCell>{a.title}</TableCell>
                <TableCell>{a.description}</TableCell>
                <TableCell>{a.dueDate?.split("T")[0]}</TableCell>
                <TableCell>{a.status}</TableCell>
                {role === "teacher" && (
                  <TableCell>
                    {a.answer
                      ? `${a.answer}: ${a.answer}`
                      : "No submissions"}
                  </TableCell>
                )}

                <TableCell>
                  {role === "student" && a.status === "Published" && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleOpenSubmit(a)}
                    >
                      Submit
                    </Button>
                  )}
                  {role === "teacher" && (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenEdit(a)}
                    >
                      Edit Status
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openSubmit} onClose={() => setOpenSubmit(false)}>
        <DialogTitle>Submit Answer</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={6}
            fullWidth
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSubmit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitAnswer}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Update Assignment Status</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <MenuItem value="Draft">Draft</MenuItem>
            <MenuItem value="Published">Published</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateStatus}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AssignmentTable;
