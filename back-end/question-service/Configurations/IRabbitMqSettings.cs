namespace question_service.Configurations
{
    public interface IRabbitMqSettings
    {
        string? ConnectionString { get; }
    }
}
