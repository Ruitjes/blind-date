namespace profile_service.Configurations
{
    public class MongoDbSettings : IMongoDbSettings
    {
        public string? ConnectionString { get; set; }

        public string? DatabaseName { get; set; }
    }
}
