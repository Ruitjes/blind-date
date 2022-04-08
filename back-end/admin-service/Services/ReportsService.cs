using admin_service.Data;
using admin_service.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace admin_service.Services
{
	public class ReportsService : IReportsService
	{
		private readonly IMongoCollection<Report> _reportsCollection;

		public ReportsService(IOptions<ReportsDatabaseSettings> reportsDatabaseSettings)
		{
			// reads the server instance for running database operations
			var mongoClient = new MongoClient(reportsDatabaseSettings.Value.ConnectionString);

			var mongoDatabase = mongoClient.GetDatabase(
				reportsDatabaseSettings.Value.DatabaseName
			);

			_reportsCollection = mongoDatabase.GetCollection<Report>(reportsDatabaseSettings.Value.ReportsCollectionName);
		}

		public async Task<Report?> GetAsync(string id)
		{
			return await _reportsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task CreateAsync(Report report)
		{
			await _reportsCollection.InsertOneAsync(report);
		}
	}
}