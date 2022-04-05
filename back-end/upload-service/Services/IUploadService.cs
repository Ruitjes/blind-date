using System;
using Microsoft.AspNetCore.Mvc;

namespace upload_service.Interfaces
{
	public interface IUploadService
	{
		public Task UploadFileToS3(IFormFile file);
	}
}

