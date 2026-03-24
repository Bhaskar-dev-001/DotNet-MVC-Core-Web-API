using System;
using TaskaManager.Models;


namespace TaskaManager.Services{

    public interface ITaskService
    {
        Task<List<TaskItem>> GetAllTasksAsync();
        Task<TaskItem?> GetTaskByIdAsync(int id);
        Task<TaskItem> CreateTaskItemAsync(TaskItem task);
        Task<bool> UpdateTaskItemAsync(int id , TaskItem UpdatedTask);
        Task<bool> DeleteTaskItemAsync(int id);
    }
}