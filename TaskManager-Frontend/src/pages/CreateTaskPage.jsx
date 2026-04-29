import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTaskStore } from '../store/index.js';
import Header from '../components/Header.jsx';
import { taskSchema } from '../utils/validation.js';

export default function CreateTaskPage() {
  const navigate = useNavigate();
  const { addTask, isLoading } = useTaskStore();
  const [successMessage, setSuccessMessage] = useState('');

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
      setSuccessMessage('Task created successfully! 🎉');
      setTimeout(() => {
        navigate('/tasks');
      }, 2000);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-3">✨ Create New Task</h1>
          <p className="text-green-100 text-lg">
            Add a new task to your list and stay productive
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-xl p-10">
          {successMessage && (
            <div className="mb-8 p-6 bg-green-50 border-2 border-green-200 text-green-700 rounded-lg flex items-center space-x-3 animate-in">
              <span className="text-3xl">✓</span>
              <div>
                <p className="font-bold text-lg">{successMessage}</p>
                <p className="text-sm">Redirecting to tasks...</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Task Title */}
            <div>
              <label className="block text-xl font-bold text-gray-800 mb-4">
                What needs to be done?
              </label>
              <textarea
                {...register('title')}
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter your task description here..."
                rows="6"
              />
              {errors.title && (
                <p className="text-red-500 font-medium mt-3">{errors.title.message}</p>
              )}
            </div>

            {/* Character Count */}
            <div className="flex items-center justify-between bg-blue-50 rounded-lg p-4">
              <div>
                <p className="text-sm text-gray-600">
                  <strong>💡 Tip:</strong> Be descriptive! Include details that will help you remember what needs to be done.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-8 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center space-x-2"
              >
                <span>➕</span>
                <span>{isLoading ? 'Creating Task...' : 'Create Task'}</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/tasks')}
                className="bg-gray-300 text-gray-700 font-bold py-4 px-8 rounded-lg hover:bg-gray-400 transition text-lg flex items-center justify-center space-x-2"
              >
                <span>←</span>
                <span>Cancel</span>
              </button>
            </div>
          </form>

          {/* Info Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Task Creation Tips:</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start space-x-3">
                <span className="text-green-500 font-bold">✓</span>
                <span>Be specific and clear about what you need to do</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-500 font-bold">✓</span>
                <span>Break down large tasks into smaller, manageable items</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-500 font-bold">✓</span>
                <span>Use action verbs (e.g., "Complete", "Review", "Update")</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-500 font-bold">✓</span>
                <span>You can edit or delete tasks later if needed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 font-bold hover:text-blue-800 transition text-lg flex items-center justify-center space-x-2 mx-auto"
          >
            <span>𝴸</span>
            <span>Back to Home</span>
          </button>
        </div>
      </main>
    </div>
  );
}
