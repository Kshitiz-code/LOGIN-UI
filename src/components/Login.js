import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";
import axios from "axios";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setMessage("Please enter email and password");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        username,
        password,
      });

      // Store user info including email
      const userData = {
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        userType: res.data.userType,
        email: res.data.email || username, // fallback in case backend doesn't return email
      };

      setUser(userData);
      navigate("/main"); // redirect to main page
    } catch (err) {
      if (err.response) {
        // Backend returned error
        setMessage(err.response.data.message);
      } else {
        setMessage("Server error. Please try again later.");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        mt={8}
        p={4}
        boxShadow={3}
        borderRadius={2}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        {message && <Alert severity="error">{message}</Alert>}

        <TextField
          label="Email"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
          Submit
        </Button>

        <Typography variant="body2" align="center">
          Don't have an account? <Link to="/register">Register here</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
