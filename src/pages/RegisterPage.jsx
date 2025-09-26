import React, { useState } from "react";
import { Container, Button, Typography, Box, Alert, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import CustomTextField from "../components/CustomTextField";
import api from "../utils/api";

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!form.name || !form.email || !form.password) return setError("All fields required");
    try {
      await api.post("/user/register", form);
      setSuccess("Registration successful. Login now.");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4">Register</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Box component="form" onSubmit={handleSubmit}>
        <CustomTextField label="Name" name="name" value={form.name} onChange={handleChange} />
        <CustomTextField label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
        <CustomTextField label="Password" name="password" value={form.password} onChange={handleChange} type="password" />
        <CustomTextField label="Role" name="role" select value={form.role} onChange={handleChange}>
          <MenuItem value="teacher">Teacher</MenuItem>
          <MenuItem value="student">Student</MenuItem>
        </CustomTextField>
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Register</Button>
      </Box>
    </Container>
  );
};

export default RegisterPage;
