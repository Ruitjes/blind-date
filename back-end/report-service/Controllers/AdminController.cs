using report_service.Dtos;
using report_service.Models;
using report_service.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace report_service.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class AdminController : ControllerBase
	{
		private readonly IAdminService _service;

		public AdminController(IAdminService service)
		{
			_service = service;
		}

		[HttpGet("BlockUser/{userIdentifier}")]
        public async Task<ActionResult<string>> BlockUser(string userIdentifier)
		{
			return await _service.ManageUserBlock(userIdentifier, true);
		}

		[HttpGet("UnblockUser/{userIdentifier}")]
		public async Task<ActionResult<string>> UnblockUser(string userIdentifier)
		{
			return await _service.ManageUserBlock(userIdentifier, false);
		}
	}
}