// pages/SignupPage.jsx
import React, { useState } from "react";
import { saveToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`,
        form
      );
      saveToken(res.data.token);
      navigate("/login");
    } catch (err) {
      alert("Signup failed. Try a different email.");
    }
  };
  //   console.log(import.meta.env.VITE_API_BASE_URL);

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={form.name}
          required
          className="w-full p-2 border rounded mb-3"
        />
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
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
