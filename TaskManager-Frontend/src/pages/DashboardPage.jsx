import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTaskStore, useAuthStore } from '../store/index.js';
import Header from '../components/Header.jsx';
import TaskList from '../components/TaskList.jsx';
import { taskSchema } from '../utils/validation.js';

export default function DashboardPage() {
  const { tasks, addTask, fetchTasks, isLoading } = useTaskStore();
  const { user } = useAuthStore();
  const [successMessage, setSuccessMessage] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showTaskList, setShowTaskList] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data) => {
    try {
      await addTask(data.title);
      reset();
      setSuccessMessage('Task created successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, {user?.userName}! 👋
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Stay organized and productive. Manage your tasks efficiently.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            {/* Total Tasks */}
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2">{totalTasks}</div>
              <p className="text-blue-100">Total Tasks</p>
            </div>

            {/* Completed Tasks */}
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2 text-green-300">{completedTasks}</div>
              <p className="text-blue-100">Completed</p>
            </div>

            {/* Pending Tasks */}
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2 text-yellow-300">{pendingTasks}</div>
              <p className="text-blue-100">Pending</p>
            </div>

            {/* Completion Rate */}
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2">{completionPercentage}%</div>
              <p className="text-blue-100">Completion Rate</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button
              onClick={() => {
                setShowTaskList(true);
                setShowTaskForm(false);
              }}
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition shadow-lg flex items-center justify-center space-x-2"
            >
              <span>📋</span>
              <span>View All Tasks</span>
            </button>
            <button
              onClick={() => {
                setShowTaskForm(true);
                setShowTaskList(false);
              }}
              className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition shadow-lg flex items-center justify-center space-x-2"
            >
              <span>➕</span>
              <span>Create New Task</span>
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Create Task Form */}
        {showTaskForm && (
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <span>✨</span>
                <span>Create New Task</span>
              </h2>

              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center space-x-2">
                  <span>✓</span>
                  <span>{successMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Task Title
                  </label>
                  <textarea
                    {...register('title')}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What needs to be done?"
                    rows="4"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>
                  )}
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Adding Task...' : '+ Add Task'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTaskForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tasks List */}
        {showTaskList && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center space-x-2">
              <span>📋</span>
              <span>Your Tasks</span>
            </h2>
            {totalTasks === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Tasks Yet</h3>
                <p className="text-gray-600 mb-6">Create your first task to get started!</p>
                <button
                  onClick={() => {
                    setShowTaskForm(true);
                    setShowTaskList(false);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-bold hover:shadow-lg transition"
                >
                  + Create Your First Task
                </button>
              </div>
            ) : (
              <TaskList />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
