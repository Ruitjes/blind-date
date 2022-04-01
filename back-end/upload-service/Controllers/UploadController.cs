using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using upload_service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace upload_service.Controllers
{
    [Route("api/[controller]")]
    public class UploadController : Controller
    {
        private readonly IUploadService _uploadService;

        public UploadController(IUploadService uploadService)
        {
            _uploadService = uploadService;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return Ok("Controller is working!");
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> UploadFileToS3(IFormFile file)
        {
            var result = await _uploadService.UploadFileToS3(file);
            if (!result)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}

