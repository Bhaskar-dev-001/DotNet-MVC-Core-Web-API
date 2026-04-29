import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskStore, useAuthStore } from '../store/index.js';
import Header from '../components/Header.jsx';

export default function HomePage() {
  const navigate = useNavigate();
  const { tasks, fetchTasks } = useTaskStore();
  const { user } = useAuthStore();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Dynamic rotation based on mouse position
  const rotateX = (mousePosition.y - window.innerHeight / 2) * 0.002;
  const rotateY = (mousePosition.x - window.innerWidth / 2) * 0.002;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <Header />

      {/* Hero Section with 3D Effect */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center perspective"
            style={{
              transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <div className="mb-6 inline-block">
              <div className="text-7xl animate-bounce" style={{ animationDuration: '3s' }}>
                👋
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome back, {user?.userName}!
            </h1>
            <p className="text-2xl text-blue-200 max-w-3xl mx-auto mb-8 font-light">
              Stay organized and productive. Manage your tasks efficiently and achieve your goals.
            </p>
          </div>

          {/* 3D Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
            {/* Total Tasks Card */}
            <div
              className="group relative"
              style={{
                transform: `perspective(1000px) rotateX(${rotateX * 2}deg) rotateY(${rotateY * 2}deg)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-gray-900 rounded-2xl p-8 border border-blue-500 border-opacity-20 hover:border-opacity-50 transition duration-300 transform group-hover:scale-105">
                <div className="text-6xl mb-4 animate-spin" style={{ animationDuration: '8s' }}>
                  📊
                </div>
                <div className="text-5xl font-black text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mb-2">
                  {totalTasks}
                </div>
                <p className="text-blue-300 text-lg font-semibold">Total Tasks</p>
              </div>
            </div>

            {/* Completed Tasks Card */}
            <div
              className="group relative"
              style={{
                transform: `perspective(1000px) rotateX(${rotateX * 2}deg) rotateY(${rotateY * 2}deg)`,
                transitionDelay: '0.1s',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-gray-900 rounded-2xl p-8 border border-green-500 border-opacity-20 hover:border-opacity-50 transition duration-300 transform group-hover:scale-105">
                <div className="text-6xl mb-4 animate-bounce" style={{ animationDuration: '2s' }}>
                  ✅
                </div>
                <div className="text-5xl font-black text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text mb-2">
                  {completedTasks}
                </div>
                <p className="text-green-300 text-lg font-semibold">Completed</p>
              </div>
            </div>

            {/* Pending Tasks Card */}
            <div
              className="group relative"
              style={{
                transform: `perspective(1000px) rotateX(${rotateX * 2}deg) rotateY(${rotateY * 2}deg)`,
                transitionDelay: '0.2s',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-gray-900 rounded-2xl p-8 border border-yellow-500 border-opacity-20 hover:border-opacity-50 transition duration-300 transform group-hover:scale-105">
                <div className="text-6xl mb-4 animate-pulse">⏳</div>
                <div className="text-5xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text mb-2">
                  {pendingTasks}
                </div>
                <p className="text-yellow-300 text-lg font-semibold">Pending</p>
              </div>
            </div>

            {/* Completion Rate Card */}
            <div
              className="group relative"
              style={{
                transform: `perspective(1000px) rotateX(${rotateX * 2}deg) rotateY(${rotateY * 2}deg)`,
                transitionDelay: '0.3s',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-gray-900 rounded-2xl p-8 border border-purple-500 border-opacity-20 hover:border-opacity-50 transition duration-300 transform group-hover:scale-105">
                <div className="text-6xl mb-4 animate-bounce" style={{ animationDelay: '0.5s' }}>
                  🎯
                </div>
                <div className="text-5xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
                  {completionPercentage}%
                </div>
                <p className="text-purple-300 text-lg font-semibold">Completion</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            {/* View Tasks */}
            <button
              onClick={() => navigate('/tasks')}
              className="group relative h-24 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-gray-900 rounded-2xl h-full border border-blue-500 border-opacity-20 hover:border-opacity-50 transition duration-300 flex items-center justify-center space-x-3 transform group-hover:scale-105 group-hover:shadow-2xl">
                <span className="text-4xl">📋</span>
                <span className="text-xl font-bold text-white">View All Tasks</span>
              </div>
            </button>

            {/* Create Task */}
            <button
              onClick={() => navigate('/create-task')}
              className="group relative h-24 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-gray-900 rounded-2xl h-full border border-green-500 border-opacity-20 hover:border-opacity-50 transition duration-300 flex items-center justify-center space-x-3 transform group-hover:scale-105 group-hover:shadow-2xl">
                <span className="text-4xl">➕</span>
                <span className="text-xl font-bold text-white">Create Task</span>
              </div>
            </button>

            {/* Quick Stats */}
            <button
              onClick={() => navigate('/tasks')}
              className="group relative h-24 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-gray-900 rounded-2xl h-full border border-purple-500 border-opacity-20 hover:border-opacity-50 transition duration-300 flex items-center justify-center space-x-3 transform group-hover:scale-105 group-hover:shadow-2xl">
                <span className="text-4xl">📈</span>
                <span className="text-xl font-bold text-white">Manage Tasks</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Why Use Task Manager?
          </h2>
          <p className="text-center text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
            Powerful features designed to boost your productivity
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-gray-900 rounded-2xl p-8 border border-gray-700 group-hover:border-blue-500 transition duration-300 transform group-hover:scale-105">
                <div className="text-6xl mb-4 inline-block transform group-hover:rotate-12 transition duration-300">
                  ⚡
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Quick & Easy</h3>
                <p className="text-gray-400 leading-relaxed">
                  Create, edit, and manage tasks in seconds. Our intuitive interface makes task management effortless and enjoyable for everyone.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-gray-900 rounded-2xl p-8 border border-gray-700 group-hover:border-green-500 transition duration-300 transform group-hover:scale-105">
                <div className="text-6xl mb-4 inline-block transform group-hover:rotate-12 transition duration-300">
                  🎯
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Stay Focused</h3>
                <p className="text-gray-400 leading-relaxed">
                  Track completion rates and visualize your progress with real-time statistics. See exactly what you've accomplished.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-gray-900 rounded-2xl p-8 border border-gray-700 group-hover:border-purple-500 transition duration-300 transform group-hover:scale-105">
                <div className="text-6xl mb-4 inline-block transform group-hover:rotate-12 transition duration-300">
                  🔒
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Secure & Private</h3>
                <p className="text-gray-400 leading-relaxed">
                  Your tasks are encrypted and only visible to you. Your privacy is our top priority. We never share your data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                {totalTasks}
              </div>
              <p className="text-gray-400">Tasks Tracked</p>
            </div>
            <div>
              <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                {completedTasks}
              </div>
              <p className="text-gray-400">Tasks Done</p>
            </div>
            <div>
              <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {completionPercentage}%
              </div>
              <p className="text-gray-400">Success Rate</p>
            </div>
            <div>
              <div className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                💪
              </div>
              <p className="text-gray-400">Keep Going!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to boost your productivity?
          </h3>
          <button
            onClick={() => navigate('/create-task')}
            className="group relative inline-block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-gray-900 text-white font-bold py-4 px-10 rounded-full border border-purple-500 border-opacity-50 group-hover:border-opacity-100 transition duration-300 transform group-hover:scale-110">
              Get Started Now
            </div>
          </button>
        </div>
      </section>
    </div>
  );
}
