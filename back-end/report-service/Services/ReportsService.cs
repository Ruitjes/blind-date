using report_service.Data;
using report_service.Models;
using MongoDB.Driver;

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

		public async Task<List<Report>> GetAsync()
		{
			return await _reportsCollection.Find(x => true).ToListAsync();
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

		public string GetUserByJWTToken()
		{
			var userFromJWT = _httpContext.HttpContext.User;
			var userIdentifier = userFromJWT.Claims.Where(claim => claim.Type.Contains("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")).FirstOrDefault().Value;
			return userIdentifier;
		}
	}
}