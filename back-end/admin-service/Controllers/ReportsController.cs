using admin_service.Dtos;
using admin_service.Models;
using admin_service.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace admin_service.Controllers
{
	[Route("api/[controller]")]
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
		public async Task<ActionResult<ReportReadDto>> GetReportById(string id)
		{
			var reportItem = await _service.GetAsync(id);

			if (reportItem != null)
			{
				// return an object of type PlatformReadDto
				return Ok(_mapper.Map<ReportReadDto>(reportItem));
			}

			return NotFound();
		}

		[HttpPost]
		public async Task<ActionResult<ReportReadDto>> CreateReport(ReportCreateDto reportCreateDto)
		{
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
	}
}