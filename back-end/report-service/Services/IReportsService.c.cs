using report_service.Models;

namespace report_service.Services
{
	public interface IReportsService
	{
		public Task<Report?> GetAsync(string id);

		public Task CreateAsync(Report report);
	}
}