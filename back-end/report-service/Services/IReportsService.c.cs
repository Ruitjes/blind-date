using report_service.Models;

namespace report_service.Services
{
	public interface IReportsService
	{
		public Task<List<Report?>> GetAsync();

		public Task<Report?> GetAsync(string id);

		public Task CreateAsync(Report report);

		public string GetUserByJWTToken();
	}
}