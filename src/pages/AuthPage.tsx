import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Alert,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import CustomTextField from "../components/CustomTextField";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tab, setTab] = useState(0); 
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
    setError("");
    setSuccess("");
  };

  const handleLoginChange = e => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  const handleRegisterChange = e => setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 
    if (!loginForm.email || !loginForm.password) return setError("Email & password required");
    try {
      const res = await api.post("/api/auth/login", loginForm);
      dispatch(loginSuccess({ user: { role: res.data.role, email: loginForm.email }, token: res.data.token }));
      res.data.role === "teacher" ? navigate("/teacher") : navigate("/student");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!registerForm.name || !registerForm.email || !registerForm.password) return setError("All fields required");
    try {
      await api.post("/api/auth/register", registerForm);
      setSuccess("Registration successful! You can login now.");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  const handleForgotPassword = async () => {
    if (!loginForm.email) return setError("Enter email to reset password");
    try {
      await api.post("/user/forgot-password", { email: loginForm.email });
      setSuccess("Check your email for reset instructions");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset email");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" textAlign="center">Welcome</Typography>
      <Box sx={{ mt: 2 }}>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}

        {/* LOGIN FORM */}
        {tab === 0 && (
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
            <CustomTextField label="Email" name="email" value={loginForm.email} onChange={handleLoginChange} type="email" />
            <CustomTextField
              label="Password"
              name="password"
              value={loginForm.password}
              onChange={handleLoginChange}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button onClick={handleForgotPassword} sx={{ mt: 1, mb: 2 }}>Forgot Password?</Button>
            <Button type="submit" variant="contained" fullWidth>Login</Button>
          </Box>
        )}

        {/* REGISTER FORM */}
        {tab === 1 && (
          <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
            <CustomTextField label="Name" name="name" value={registerForm.name} onChange={handleRegisterChange} />
            <CustomTextField label="Email" name="email" value={registerForm.email} onChange={handleRegisterChange} type="email" />
            <CustomTextField
              label="Password"
              name="password"
              value={registerForm.password}
              onChange={handleRegisterChange}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <CustomTextField label="Role" name="role" select value={registerForm.role} onChange={handleRegisterChange}>
              <MenuItem value="teacher">Teacher</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </CustomTextField>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Register</Button>
          </Box>
        )}

      </Box>
    </Container>
  );
};

export default AuthPage;
