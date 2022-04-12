namespace profile_service.Configurations
{
    public interface IMongoDbSettings
    {
        string? ConnectionString { get; set; }

        string? DatabaseName { get; set; }
    }
}