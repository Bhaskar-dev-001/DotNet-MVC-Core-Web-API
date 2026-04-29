import { useState } from 'react';
import { useTaskStore } from '../store/index.js';
import { formatDate } from '../utils/dateUtils.js';

export default function TaskItem({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const { updateTask, deleteTask, toggleTask, isLoading } = useTaskStore();

  const handleUpdate = async () => {
    if (editTitle.trim()) {
      try {
        await updateTask(task.id, editTitle);
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    }
  };

  const handleToggle = async () => {
    try {
      await toggleTask(task.id);
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task.id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  return (
    <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={handleToggle}
            disabled={isLoading}
            className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleUpdate}
                    disabled={isLoading}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p
                  className={`text-base font-medium transition ${
                    task.isCompleted
                      ? 'line-through text-gray-400'
                      : 'text-gray-800'
                  }`}
                >
                  {task.title}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Created: {formatDate(task.createdDate)}
                </p>
              </div>
            )}
          </div>
        </div>
        {!isEditing && (
          <div className="flex space-x-2 ml-2">
            <button
              onClick={() => setIsEditing(true)}
              disabled={isLoading || task.isCompleted}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm disabled:text-gray-400 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="text-red-600 hover:text-red-800 font-medium text-sm disabled:text-gray-400 transition"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
