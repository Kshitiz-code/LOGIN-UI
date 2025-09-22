import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import MainPage from "./components/MainPage";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/main" /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/main"
        element={user ? <MainPage user={user} /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
