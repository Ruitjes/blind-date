namespace report_service.Data
{
	public class ReportsDatabaseSettings
	{
		public string ConnectionString { get; set; } = null!;
		public string DatabaseName { get; set; } = null!;
		public string ReportsCollectionName { get; set; } = null!;

		public ReportsDatabaseSettings(string? connectionString, string? databaseName, string? reportsCollectionName)
		{
			if (connectionString == null || databaseName == null || reportsCollectionName == null)
			{
				throw new Exception("Database environment variables are not set.");
			}
			else
			{
				ConnectionString = connectionString;
				DatabaseName = databaseName;
				ReportsCollectionName = reportsCollectionName;
			}
		}
	}
}