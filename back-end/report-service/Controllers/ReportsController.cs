using report_service.Dtos;
using report_service.Models;
using report_service.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace report_service.Controllers
{
	[ApiController]
	[Route("[controller]")]
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
			string reporterId = _service.GetUserByJWTToken();

			var reportModel = _mapper.Map<Report>(reportCreateDto);

			//if(reportModel.Reporter.Id != reporterId) {
			//	return Unauthorized();
			//}

			if(await _service.ReportExists(reportModel)) {
				return Conflict("Content was already reported");
			}

			// create report
			var report = await _service.CreateAsync(reportModel);

			// get report read dto and return it to user
			var reportReadDto = _mapper.Map<ReportReadDto>(report);

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
		
		[HttpPatch("{id}")]
		public async Task<ActionResult> HandleReport(string id, [FromBody] string newStatus)
		{
			var report = await _service.GetAsync(id);

			if(report == null) {
				return NotFound($"Report with id: {id} was not found");
			}

			Enum.TryParse(newStatus, out Status newStatusEnum);

			await _service.HandleAsync(report, newStatusEnum);

			return Ok();
		}
	}
}