namespace upload_service.Configurations
{
    public class AmazonS3Settings : IAmazonS3Settings
    {
        public string? AccessKey { get; set; }

        public string? SecretKey { get; set; }

        public string? BucketName { get; set; }
    }
}

