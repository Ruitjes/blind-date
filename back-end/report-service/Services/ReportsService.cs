using report_service.Data;
using report_service.Models;
using MongoDB.Driver;

namespace report_service.Services
{
	public class ReportsService : IReportsService
	{
		private readonly IMongoCollection<Report> _reportsCollection;

		public ReportsService(ReportsDatabaseSettings reportsDatabaseSettings)
		{
			var client = new MongoClient(reportsDatabaseSettings.ConnectionString);
			var database = client.GetDatabase(reportsDatabaseSettings.DatabaseName);
			_reportsCollection = database.GetCollection<Report>(reportsDatabaseSettings.ReportsCollectionName);
		}

		public async Task<Report> GetAsync(string id)
		{
			return await _reportsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
		}
		
		public async Task<IEnumerable<Report>> GetAllAsync()
		{
			return await _reportsCollection.Find(s => true).ToListAsync();
		}

		public async Task CreateAsync(Report report)
		{
			await _reportsCollection.InsertOneAsync(report);
		}
	}
}