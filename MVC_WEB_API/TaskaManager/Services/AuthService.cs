using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using TaskaManager.Data;
using TaskaManager.DTOs;
using TaskaManager.Models;

namespace TaskaManager.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _context;
        private readonly PasswordHasher<User> _passwordHasher;

        public AuthService(IConfiguration configuration, AppDbContext context)
        {
            _configuration = configuration;
            _context = context;
            _passwordHasher = new PasswordHasher<User>();
        }

        public async Task<string?> LoginAsync(string username, string password)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == username || u.Email == username);

            if (user == null)
            {
                return null;
            }

            var verificationResult = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
            if (verificationResult != PasswordVerificationResult.Success)
            {
                return null;
            }

            return GenerateJwtToken(user);
        }

        public async Task<bool> RegisterAsync(RegisterDto registerDto)
        {
            var normalizedUserName = registerDto.UserName.Trim();
            var normalizedEmail = registerDto.Email.Trim().ToLowerInvariant();

            if (await _context.Users.AnyAsync(u => u.UserName == normalizedUserName || u.Email == normalizedEmail))
            {
                return false;
            }

            var user = new User
            {
                UserName = normalizedUserName,
                Email = normalizedEmail,
                Role = "User",
                CreatedAt = DateTime.UtcNow
            };

            user.PasswordHash = _passwordHasher.HashPassword(user, registerDto.Password);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return true;
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var jwtSettings = _configuration.GetSection("Jwt");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];
            var duration = int.Parse(jwtSettings["DurationInMinutes"]!);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(duration),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
