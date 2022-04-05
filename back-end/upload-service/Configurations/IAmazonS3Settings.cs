namespace upload_service.Configurations
{
    public interface IAmazonS3Settings
    {
        string? AccessKey { get; set; }

        string? SecretKey { get; set; }

        string? BucketName { get; set; }
    }
}