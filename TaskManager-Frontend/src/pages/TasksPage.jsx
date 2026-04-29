import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '../store/index.js';
import Header from '../components/Header.jsx';
import TaskList from '../components/TaskList.jsx';

export default function TasksPage() {
  const navigate = useNavigate();
  const { tasks, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">📋 Your Tasks</h1>
              <p className="text-blue-100 text-lg">
                {totalTasks} total • {completedTasks} completed • {pendingTasks} pending
              </p>
            </div>
            <button
              onClick={() => navigate('/create-task')}
              className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition shadow-lg flex items-center space-x-2"
            >
              <span>➕</span>
              <span>New Task</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {totalTasks === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-16 text-center">
            <div className="text-8xl mb-6">📝</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">No Tasks Yet</h2>
            <p className="text-gray-600 text-lg mb-8">
              Create your first task to get started and stay organized!
            </p>
            <button
              onClick={() => navigate('/create-task')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg transition inline-flex items-center space-x-2"
            >
              <span>➕</span>
              <span>Create Your First Task</span>
            </button>
          </div>
        ) : (
          <div>
            {/* Progress Bar */}
            <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800">Progress</h3>
                <span className="text-lg font-bold text-blue-600">
                  {completedTasks}/{totalTasks}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-600 h-4 rounded-full transition-all duration-500"
                  style={{
                    width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Tasks List */}
            <TaskList />
          </div>
        )}

        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 font-bold hover:text-blue-800 transition text-lg flex items-center justify-center space-x-2 mx-auto"
          >
            <span>←</span>
            <span>Back to Home</span>
          </button>
        </div>
      </main>
    </div>
  );
}
