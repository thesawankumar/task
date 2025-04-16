import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  const { isAuthenticated } = useAuth(); // Access authentication state from context

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Redirect the root URL to /tasks (or login if not authenticated) */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/tasks" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Login route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Signup route */}
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected route for /tasks */}
        <Route
          path="/tasks"
          element={isAuthenticated ? <TasksPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
