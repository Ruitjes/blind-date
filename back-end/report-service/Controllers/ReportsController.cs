using report_service.Dtos;
using report_service.Models;
using report_service.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace report_service.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class ReportsController : ControllerBase
	{
		private readonly IReportsService _service;
		private readonly IMapper _mapper;

		public ReportsController(IReportsService service, IMapper mapper)
		{
			_service = service;
			_mapper = mapper;
		}

		[HttpGet("{id:length(24)}", Name = "GetReportById")]
		[Authorize(Roles = "Admin")]
        public async Task<ActionResult<ReportReadDto>> GetReportById(string id)
		{
			var reportItem = await _service.GetAsync(id);

			if (reportItem != null)
			{
				// return an object of type ReportReadDto
				return Ok(_mapper.Map<ReportReadDto>(reportItem));
			}

			return NotFound();
		}

		[HttpPost]
		public async Task<ActionResult<ReportReadDto>> CreateReport(ReportCreateDto reportCreateDto)
		{
			// TODO: get user from token
			//string userIdentifier = _profileService.GetUserByJWTToken();
			//string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
			//Console.WriteLine("----------->" + userId);

			string reporterId = _service.GetUserByJWTToken();

			Console.WriteLine("-----------> " + reportCreateDto);
			Console.WriteLine("-----------> " + reportCreateDto.Question.Id);
			Console.WriteLine("-----------> " + reportCreateDto.Question.Content);
			Console.WriteLine("-----------> " + reportCreateDto.Reported.Id);
			Console.WriteLine("-----------> " + reportCreateDto.ReportedContent);

			var reportModel = _mapper.Map<Report>(reportCreateDto);

			// create report
			await _service.CreateAsync(reportModel);

			// get report read dto and return it to user
			var reportReadDto = _mapper.Map<ReportReadDto>(reportModel);

			return CreatedAtRoute(
				nameof(GetReportById),
				new { Id = reportReadDto.Id },
				reportReadDto
			);
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<ReportReadDto>>> GetReports()
		{
			var reports = _mapper.Map<IEnumerable<ReportReadDto>>(await _service.GetAllAsync());

			return Ok(reports);
		}
	}
}