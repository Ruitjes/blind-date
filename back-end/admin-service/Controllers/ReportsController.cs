using admin_service.Data;
using admin_service.Dtos;
using admin_service.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace admin_service.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ReportsController : ControllerBase
	{
		private readonly IReportRepo _repository;
		private readonly IMapper _mapper;

		public ReportsController(IReportRepo repository, IMapper mapper)
		{
			_repository = repository;
			_mapper = mapper;
		}

		[HttpGet("{id}", Name = "GetReportById")]
		public ActionResult<ReportReadDto> GetReportById(int id)
		{
			var reportItem = _repository.GetReportById(id);

			if (reportItem != null)
			{
				// return an object of type PlatformReadDto
				return Ok(_mapper.Map<ReportReadDto>(reportItem));
			}

			return NotFound();
		}

		[HttpPost]
		public ActionResult<ReportReadDto> CreateReport(ReportCreateDto reportCreateDto)
		{
			var reportModel = _mapper.Map<Report>(reportCreateDto);

			// create report
			_repository.CreateReport(reportModel);
			_repository.SaveChanges();

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