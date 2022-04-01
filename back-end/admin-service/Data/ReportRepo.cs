using admin_service.Models;

namespace admin_service.Data
{
	public class ReportRepo : IReportRepo
	{
		private readonly AppDbContext _context;

		public ReportRepo(AppDbContext context)
		{
			_context = context;
		}

		public void CreateReport(Report report)
		{
			// validate
			if (report == null)
			{
				throw new ArgumentNullException(nameof(report));
			}

			_context.Reports.Add(report);
		}

		public Report GetReportById(int id)
		{
			return _context.Reports.FirstOrDefault(r => r.Id == id)!;
		}

		public bool SaveChanges()
		{
			return (_context.SaveChanges() >= 0);
		}
	}
}