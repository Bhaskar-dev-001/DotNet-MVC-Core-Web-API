import { create } from 'zustand';
import { authAPI, tasksAPI } from '../services/api.js';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,

  register: async (username, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.register({
        userName: username,
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ userName: username, email }));
      set({ token, user: { userName: username, email }, isLoading: false });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.login({
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ userName: username }));
      set({ token, user: { userName: username }, isLoading: false });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null });
  },
}));

export const useTaskStore = create((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await tasksAPI.getAll();
      set({ tasks: response.data, isLoading: false });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch tasks';
      set({ error: errorMessage, isLoading: false });
    }
  },

  addTask: async (title) => {
    set({ isLoading: true, error: null });
    try {
      const response = await tasksAPI.create({ title });
      set((state) => ({
        tasks: [...state.tasks, response.data],
        isLoading: false,
      }));
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create task';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  updateTask: async (id, title) => {
    set({ isLoading: true, error: null });
    try {
      const response = await tasksAPI.update(id, { title });
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, title } : task
        ),
        isLoading: false,
      }));
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update task';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  toggleTask: async (id) => {
  set({ isLoading: true, error: null });
  try {
    // Get the task from current state to access its title
    const task = useTaskStore.getState().tasks.find(t => t.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    
    // Use the update endpoint with toggled isCompleted
    const response = await tasksAPI.update(id, { 
      title: task.title,
      isCompleted: !task.isCompleted 
    });
    
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
      ),
      isLoading: false,
    }));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to toggle task';
    set({ error: errorMessage, isLoading: false });
    throw error;
  }
},

  deleteTask: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await tasksAPI.delete(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete task';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },
}));
