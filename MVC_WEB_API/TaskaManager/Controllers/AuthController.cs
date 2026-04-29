using Microsoft.AspNetCore.Mvc;
using TaskaManager.DTOs;
using TaskaManager.Services;
namespace TaskaManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var created = await _authService.RegisterAsync(registerDto);
            if (!created)
            {
                return BadRequest(new { message = "Username or email already exists." });
            }

            return Ok(new { message = "Registration successful." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var token = await _authService.LoginAsync(loginDto.UserName, loginDto.Password);
            if (token == null)
            {
                return Unauthorized();
            }

            return Ok(new { token });
        }
    }
}
