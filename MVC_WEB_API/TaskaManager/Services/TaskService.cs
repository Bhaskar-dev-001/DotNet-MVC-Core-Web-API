using Microsoft.EntityFrameworkCore;
using SQLitePCL;
using TaskaManager.Data;
using TaskaManager.Models;
namespace TaskaManager.Services
{
    
    public class TaskService  : ITaskService
    {
        private readonly AppDbContext _context;

        public TaskService(AppDbContext context)
        {
            _context = context;
        }


 public async Task<List<TaskItem>> GetAllTasksAsync()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<TaskItem?> GetTaskByIdAsync(int id)
        {
        var task = await _context.Tasks.FirstOrDefaultAsync(t=>t.Id == id);
        if(task == null)
            {
                return null;
            }
            return task;
        }
        public async Task<TaskItem> CreateTaskItemAsync(TaskItem task)
        {
            task.CreatedDate = DateTime.Now;
            await _context.Tasks.AddAsync(task);
            await _context.SaveChangesAsync();
            return task;

        }
        public async Task<bool>UpdateTaskItemAsync(int id, TaskItem task)
        {
            var item = await _context.Tasks.FirstOrDefaultAsync(t=>t.Id == id);
            if(item == null)
            {
                return false;
            }
            item.Title = task.Title;
            item.IsCompleted = task.IsCompleted;
            await _context.SaveChangesAsync();
            return true;
        } 

        public async Task<bool>DeleteTaskItemAsync(int id)
        {
            var item = await _context.Tasks.FirstOrDefaultAsync(t=>t.Id== id);
            if(item == null)
            {
                return false;
            }

                  _context.Remove(item);
            await _context.SaveChangesAsync();
            return true;

        }
    }

}