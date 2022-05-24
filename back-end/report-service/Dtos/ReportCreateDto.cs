using System.ComponentModel.DataAnnotations;
using report_service.Models;

namespace report_service.Dtos
{
	public class ReportCreateDto
	{
		[Required]
		public User Reporter { get; set; }

		[Required]
		public UserDto Reported { get; set; }

		[Required]
		public string ReportedContent { get; set; }

		[Required]
		public QuestionDto Question { get; set; }
	}
}