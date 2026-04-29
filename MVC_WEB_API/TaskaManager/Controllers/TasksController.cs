using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskaManager.DTOs;
using TaskaManager.Models;
using TaskaManager.Services;
namespace TaskaManager.Controllers
{ 
  [Authorize]
     [ApiController]
     [Route("api/[controller]")]
        public class TasksController : ControllerBase
    {
      
           private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }
        [HttpGet]
         public async Task<IActionResult> GetTask ()
        {
           var tasks = await _taskService.GetAllTasksAsync();

           return Ok(tasks);
        }
         
         [HttpGet("{id}")]
         public async Task<IActionResult> GetTaskById(int id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);
            if(task == null)
            {
                return NotFound();
            }
            
         
          return Ok(task);
            
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask(CreateTaskDto createTaskDto)
        {
            var taskitem = new TaskItem
            {
                Title = createTaskDto.Title,
                IsCompleted = createTaskDto.IsCompleted,
                CreatedDate = DateTime.Now,
            };
            var task = await _taskService.CreateTaskItemAsync(taskitem);
            return CreatedAtAction(nameof(GetTaskById), new { id = task.Id }, task);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id,   UpdateTaskDto updatedTask)
        {
            var item = new TaskItem
            {
                Title = updatedTask.Title,
                IsCompleted = updatedTask.IsCompleted,  
            };
            var updated = await _taskService.UpdateTaskItemAsync(id, item);

            if (!updated)
            {
                return NotFound();
            }

          
            return NoContent();
        }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
        {
            var deleted = await _taskService.DeleteTaskItemAsync(id);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();

        }
    

    }
}
