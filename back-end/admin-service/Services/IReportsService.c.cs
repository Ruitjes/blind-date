using admin_service.Models;

namespace admin_service.Services
{
	public interface IReportsService
	{
		public Task<Report?> GetAsync(string id);

		public Task CreateAsync(Report report);
	}
}