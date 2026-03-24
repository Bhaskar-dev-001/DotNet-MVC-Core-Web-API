using System.ComponentModel.DataAnnotations;

namespace TaskaManager.DTOs
{
    public class LoginDto
    {
        [Required][StringLength(50)]
        public string UserName {get; set;} = string.Empty;

        [Required][StringLength(50,MinimumLength =6)]
        public string Password {get; set;} =string.Empty;
    }
}