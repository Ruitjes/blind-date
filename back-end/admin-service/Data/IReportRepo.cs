using admin_service.Models;

namespace admin_service.Data
{
	public interface IReportRepo
	{
		bool SaveChanges();

		Report GetReportById(int id);

		void CreateReport(Report report);
	}
}