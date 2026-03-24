using System.ComponentModel.DataAnnotations;

namespace TaskaManager.DTOs
{
    public class CreateTaskDto
    {
        [Required][StringLength(100)]
        public string Title {get; set;} = string.Empty;

      
        public bool IsCompleted {get; set;}
    }
}