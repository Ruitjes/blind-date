namespace upload_service.Configurations
{
    public interface IAmazonS3Settings
    {
        string? AccessKey { get; }

        string? SecretKey { get;}

        string? BucketName { get; }
    }
}