using report_service.Models;

namespace report_service.Services
{
	public interface IReportsService
	{
		public Task<Report> GetAsync(string id);

		public Task<Report> CreateAsync(Report report);

		public string GetUserByJWTToken();
    
		public Task<List<Report>> GetAllAsync();

		public Task HandleAsync(Report report, Status newStatus);

		public Task<bool> ReportExists(Report report);
	}
}