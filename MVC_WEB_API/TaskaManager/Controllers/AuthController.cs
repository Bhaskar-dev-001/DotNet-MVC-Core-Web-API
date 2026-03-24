using Microsoft.AspNetCore.Mvc;
using TaskaManager.DTOs;
using TaskaManager.Models;
using TaskaManager.Services;
namespace  TaskaManager.Controllers{
    
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        
       [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
           var token =   await _authService.LoginAsync(loginDto.UserName, loginDto.Password);
           if(token== null)
            {
                return Unauthorized();
            }
            return Ok(token);
        }
}

}