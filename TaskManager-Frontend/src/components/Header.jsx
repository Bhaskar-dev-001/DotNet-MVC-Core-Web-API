import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/index.js';

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
 const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return { greeting: 'Good Morning', emoji: '🌅' };
  } else if (hour >= 12 && hour < 17) {
    return { greeting: 'Good Afternoon', emoji: '☀️' };
  } else if (hour >= 17 && hour < 21) {
    return { greeting: 'Good Evening', emoji: '🌆' };
  } else {
    return { greeting: 'Good Night', emoji: '🌙' };
  }
};
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-3xl">✓</div>
            <h1 className="text-2xl font-bold">Task Manager</h1>
          </div>
          {user && (
            <div className="flex items-center space-x-4">
             <span className="text-sm">
               <strong>Welcome,{user.userName}, {getTimeBasedGreeting().greeting}{getTimeBasedGreeting().emoji}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
