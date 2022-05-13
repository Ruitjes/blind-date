using System.ComponentModel.DataAnnotations;
using report_service.Models;

namespace report_service.Dtos
{
	public class ReportCreateDto
	{
		[Required]
		public User Reporter { get; set; }

		[Required]
		public User Reported { get; set; }

		[Required]
		public string ReportedContent { get; set; }

		[Required]
		public Question Question { get; set; }
	}
}