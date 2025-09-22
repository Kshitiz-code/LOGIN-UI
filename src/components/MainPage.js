import React, { useState } from "react";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
  Box,
} from "@mui/material";
import axios from "axios";

function MainPage({ user }) {
  const [userDetails, setUserDetails] = useState(null);

  // Fetch user(s) based on role
  const fetchUserDetails = async () => {
    try {
      let url = "";

      if (user.userType === "A") {
        // Admin: fetch all users
        url = "http://localhost:8080/api/users?role=A";
      } else {
        // Regular user: fetch only their own info
        url = `http://localhost:8080/api/users?role=U&email=${user.email}`;
      }

      const res = await axios.get(url);

      // If admin, res.data is array; if user, wrap in array for table
      const data =
        user.userType === "A"
          ? res.data
          : [res.data]; // single user wrapped in array
      setUserDetails(data);
    } catch (err) {
      console.error(err);
      setUserDetails([]);
    }
  };

  const downloadCSV = async () => {
    if (user.userType !== "A") return; // only admin
    try {
      const res = await axios.get(
        `http://localhost:8080/api/users/download?role=${user.userType}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users.csv");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h4" gutterBottom>
          Welcome {user.firstName} {user.lastName} (
          {user.userType === "A" ? "Admin" : "User"})
        </Typography>

        {/* Show Details button */}
        <Button
          variant="contained"
          color="primary"
          onClick={fetchUserDetails}
          sx={{ mr: 2 }}
        >
          Show Existing User
        </Button>

        {/* Admin CSV download */}
        {user.userType === "A" && (
          <Button variant="outlined" color="secondary" onClick={downloadCSV}>
            Download CSV
          </Button>
        )}

        {/* Table */}
        {userDetails && userDetails.length > 0 && (
          <Table sx={{ mt: 4 }}>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userDetails.map((u, index) => (
                <TableRow key={index}>
                  <TableCell>{u.firstName}</TableCell>
                  <TableCell>{u.lastName}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.mobileNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
    </Container>
  );
}

export default MainPage;
