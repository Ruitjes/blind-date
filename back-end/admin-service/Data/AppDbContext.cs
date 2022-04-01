using admin_service.Models;
using Microsoft.EntityFrameworkCore;

namespace admin_service.Data
{
	// Data layer
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> opt) : base(opt)
		{

		}

		public DbSet<Report> Reports { get; set; } = null!;
	}
}