// pages/TasksPage.jsx
import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import axios from "axios";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array

  const token = localStorage.getItem("token");
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/tasks/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err.response?.data || err.message);
    }
  };
  const handleComplete = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/tasks/${id}`,
        { status: "completed" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks();
    } catch (err) {
      console.error("Complete Task Error:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks();
    } catch (err) {
      console.error("Delete Task Error:", err.response?.data || err.message);
    }
  };

  const handleTaskAdded = () => {
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Tasks</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onComplete={handleComplete}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default TasksPage;
