using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace TaskaManager.Services
{
    public class AuthService : IAuthService
    {
        
        private readonly IConfiguration _configuration;
        public AuthService(IConfiguration configuration)
        {
            _configuration  = configuration;
        }
        public  Task<string?> LoginAsync(string username, string password)
        {
            if (username != "admin" || password != "1234567")
            {
                return Task.FromResult<string?>(null);
            }
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role, "Admin")
            };
            var key  = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
           var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];
            var duration = int.Parse(_configuration["Jwt:DurationInMinutes"]!);
            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(duration),
                signingCredentials: credentials
            );
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenString = tokenHandler.WriteToken(token);
            return Task.FromResult<string?>(tokenString);
        }


    }

    }