
using Microsoft.EntityFrameworkCore;
using TaskaManager.Models;
 namespace TaskaManager.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
        // public DbSet<Login> Logins { get; set; }
       public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }

    }
}       