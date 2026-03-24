
using Microsoft.EntityFrameworkCore;
using TaskaManager.Models;
 namespace TaskaManager.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<TaskItem> Tasks { get; set; }
       public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }

    }
}       