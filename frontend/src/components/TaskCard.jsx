// components/TaskCard.jsx
import React from "react";

const TaskCard = ({ task, onComplete, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4">
      {task.imageUrl && (
        <img
          src={task.imageUrl}
          alt="Task"
          className="h-40 w-full object-cover rounded-lg mb-2"
        />
      )}
      <h2 className="text-xl font-semibold">{task.title}</h2>
      <p className="text-gray-700">{task.description}</p>
      <p className="text-sm text-gray-500">Category: {task.category}</p>
      <p className="text-sm text-gray-500">
        Deadline: {task.deadline?.slice(0, 10)}
      </p>
      <p className="text-sm font-medium mt-2">
        Status: <span className="capitalize">{task.status}</span>
      </p>

      <div className="flex gap-3 mt-3">
        {task.status !== "completed" && (
          <button
            onClick={() => onComplete(task._id)}
            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
          >
            Mark Complete
          </button>
        )}
        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
