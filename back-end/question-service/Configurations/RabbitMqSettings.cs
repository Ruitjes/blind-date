namespace question_service.Configurations
{
    public class RabbitMqSettings : IRabbitMqSettings
    {
        public string? ConnectionString { get; init; }
    }
}
