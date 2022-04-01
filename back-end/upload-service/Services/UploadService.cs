using System;
using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Mvc;
using upload_service.Interfaces;

namespace upload_service.Services
{
	public class UploadService : IUploadService
	{
		public async Task<bool> UploadFileToS3(IFormFile file)
		{
            string? yourAccesKey = Environment.GetEnvironmentVariable("ACCESS_KEY");
            string? yourSecretKey = Environment.GetEnvironmentVariable("SECRET_ACCESS_KEY");
            string? bucketName = Environment.GetEnvironmentVariable("BUCKET_NAME");


            using (var client = new AmazonS3Client(yourAccesKey, yourSecretKey, RegionEndpoint.EUCentral1))
            {
                using (var newMemoryStream = new MemoryStream())
                {
                    file.CopyTo(newMemoryStream);

                    var uploadRequest = new TransferUtilityUploadRequest
                    {
                        InputStream = newMemoryStream,
                        Key = file.FileName, // filename
                        BucketName = bucketName // bucket name of S3
                    };

                    var fileTransferUtility = new TransferUtility(client);
                    await fileTransferUtility.UploadAsync(uploadRequest);
                }
            }

            return true;
		}
	}
}

