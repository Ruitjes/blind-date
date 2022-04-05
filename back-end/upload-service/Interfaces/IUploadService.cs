using System;
using Microsoft.AspNetCore.Mvc;

namespace upload_service.Interfaces
{
	public interface IUploadService
	{
		public Task<bool> UploadFileToS3(IFormFile file);
	}
}

