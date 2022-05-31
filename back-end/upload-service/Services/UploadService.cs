using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using upload_service.Configurations;
using upload_service.Interfaces;

namespace upload_service.Services
{
  public class UploadService : IUploadService, IDisposable
  {
    private readonly AmazonS3Client _client;
    private readonly IAmazonS3Settings _settings;

    public UploadService(IAmazonS3Settings settings)
    {
      _settings = settings;
      _client = new AmazonS3Client(
          _settings.AccessKey,
          _settings.SecretKey,
          RegionEndpoint.EUCentral1
      );
    }

    public async Task UploadFileToS3(IFormFile file)
    {
      using var memoryStream = new MemoryStream();
      await file.CopyToAsync(memoryStream);

      using var fileTransferUtility = new TransferUtility(_client);
      await fileTransferUtility.UploadAsync(new TransferUtilityUploadRequest
      {
        Key = file.FileName,
        InputStream = memoryStream,
        BucketName = _settings.BucketName
      });
    }

    public void Dispose()
    {
      _client.Dispose();
    }
  }
}
