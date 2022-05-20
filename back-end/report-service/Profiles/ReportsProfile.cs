using report_service.Dtos;
using report_service.Models;
using AutoMapper;

namespace report_service.Profiles
{
	public class ReportsProfile : Profile
	{
		public ReportsProfile()
		{
			// Source -> Target
			CreateMap<Report, ReportReadDto>();
			CreateMap<ReportCreateDto, Report>();
			CreateMap<UserDto, User>();
			CreateMap<User, UserDto>();
			CreateMap<QuestionDto, Question>();
			CreateMap<Question, QuestionDto>();
		}
	}
}