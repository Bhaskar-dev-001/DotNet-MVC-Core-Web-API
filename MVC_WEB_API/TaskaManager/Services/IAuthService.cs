
namespace TaskaManager.Services
{
    public interface IAuthService
    {
        Task<string?> LoginAsync(string username, string password);
        Task<bool> RegisterAsync(DTOs.RegisterDto registerDto);
    }
}