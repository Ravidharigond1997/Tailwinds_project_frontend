import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import CustomTextField from "./CustomTextField";

const CreateAssignmentDialog = ({ open, onClose, onCreate }) => {
  const [form, setForm] = useState({ title:"", description:"", dueDate:"" });

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});
  const handleSubmit = () => { onCreate(form); setForm({ title:"", description:"", dueDate:"" }); }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Assignment</DialogTitle>
      <DialogContent>
        <CustomTextField label="Title" name="title" value={form.title} onChange={handleChange} />
        <CustomTextField label="Description" name="description" value={form.description} onChange={handleChange} />
        <CustomTextField label="Due Date" name="dueDate" value={form.dueDate} onChange={handleChange} type="date" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAssignmentDialog;
