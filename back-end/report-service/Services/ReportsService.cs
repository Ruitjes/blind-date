using report_service.Data;
using report_service.Models;
using MongoDB.Driver;
using MongoDB.Bson;

namespace report_service.Services
{
	public class ReportsService : IReportsService
	{
		private readonly IMongoCollection<Report> _reportsCollection;
		private readonly IHttpContextAccessor _httpContext;


		public ReportsService(ReportsDatabaseSettings reportsDatabaseSettings, IHttpContextAccessor httpContext)
		{
			var client = new MongoClient(reportsDatabaseSettings.ConnectionString);
			var database = client.GetDatabase(reportsDatabaseSettings.DatabaseName);
			_reportsCollection = database.GetCollection<Report>(reportsDatabaseSettings.ReportsCollectionName);
			_httpContext = httpContext;
		}

		public async Task<Report> GetAsync(string id)
		{
			return await _reportsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
		}
		
		public async Task<List<Report>> GetAllAsync()
		{
			return await _reportsCollection.Find(s => true).ToListAsync();
		}

		public async Task<Report> CreateAsync(Report report)
		{
			report.Id = ObjectId.GenerateNewId().ToString();

			await _reportsCollection.InsertOneAsync(report);

			return report;
		}

		/// <summary>
		/// Handle report by changing the status
		/// </summary>
		/// <param name="report"></param>
		/// <param name="newStatus"></param>
		/// <returns></returns>
		public async Task HandleAsync(Report report, Status newStatus)
		{
			var updatedReport = Builders<Report>.Update
				.Set(r => r.Status, newStatus);

			await _reportsCollection.FindOneAndUpdateAsync(x => x.Id == report.Id, updatedReport);
		}

		public string GetUserByJWTToken()
		{
			var userFromJWT = _httpContext.HttpContext.User;
			
			var userIdentifier = userFromJWT.Claims.Where(claim => claim.Type.Contains("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")).FirstOrDefault().Value;
			return userIdentifier;
		}

		public async Task<bool> ReportExists(Report report) {
			return await _reportsCollection
				.Find(r => 
					r.Reporter.Id == report.Reporter.Id && r.Reported.Id == report.Reported.Id && 
					r.ReportedContent == report.ReportedContent && r.Question.Id == report.Question.Id
				)
				.FirstOrDefaultAsync() != null;
		}
	}
}