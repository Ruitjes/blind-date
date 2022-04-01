using admin_service.Dtos;
using admin_service.Models;
using AutoMapper;

namespace admin_service.Profiles
{
	public class ReportsProfile : Profile
	{
		public ReportsProfile()
		{
			// Source -> Target
			CreateMap<Report, ReportReadDto>();
			CreateMap<ReportCreateDto, Report>();
		}
	}
}