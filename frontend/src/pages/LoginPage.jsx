// pages/LoginPage.jsx
import React, { useState } from "react";
import { saveToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        form
      );
      saveToken(res.data.token);
      navigate("/tasks");
    } catch (err) {
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          type="email"
          required
          className="w-full p-2 border rounded mb-3"
        />
        <input
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          type="password"
          required
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
