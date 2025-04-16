// components/TaskForm.jsx
import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ onTaskAdded }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    deadline: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (let key in form) {
      data.append(key, form[key]);
    }

    if (file) data.append("image", file);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/tasks/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onTaskAdded(res.data.task);
      setForm({ title: "", description: "", category: "", deadline: "" });
      setFile(null);
    } catch (err) {
      alert("Error creating task");
      console.error("Create Task Error:", err.response?.data || err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow mb-6"
    >
      <h2 className="text-xl font-bold mb-4">Create New Task</h2>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded mb-2"
      />
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        name="deadline"
        type="date"
        value={form.deadline}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full p-2 border rounded mb-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
