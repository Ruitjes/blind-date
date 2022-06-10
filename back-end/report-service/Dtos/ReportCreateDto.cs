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

		// this property will store the content that was reported (either the question id and content or the answer id and content)
		[Required]
		public ReportedContentDto ReportedContent { get; set; }

		// this property will store the question id and content
		[Required]
		public QuestionDto Question { get; set; }
	}
}