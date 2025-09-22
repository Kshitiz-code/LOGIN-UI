import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box, Link } from "@mui/material";
import axios from "axios";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/register", {
        firstName,
        lastName,
        email,
        mobileNumber,
        password,
      });
      setMessage(res.data.message);
      setFirstName(""); setLastName(""); setEmail(""); setMobileNumber(""); setPassword("");
    } catch (err) {
      if (err.response) setMessage(err.response.data.message);
      else setMessage("Server Error");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} p={5} boxShadow={3} borderRadius={2} textAlign="center">
        <Typography variant="h4" gutterBottom>Register</Typography>
        <TextField label="First Name" fullWidth margin="normal" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <TextField label="Last Name" fullWidth margin="normal" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Mobile Number" fullWidth margin="normal" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" fullWidth onClick={handleRegister} sx={{ mt: 2 }}>Submit</Button>
        <Box mt={2}>
          <Link href="/login" underline="hover">Already have an account? Login here</Link>
        </Box>
        {message && <Typography color="error" mt={2}>{message}</Typography>}
      </Box>
    </Container>
  );
}

export default Register;
