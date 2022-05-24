using report_service.Models;

namespace report_service.Dtos
{
	public class ReportReadDto
	{
		public string Id { get; set; }

		public UserDto Reporter { get; set; }

		public UserDto Reported { get; set; }

		public string ReportedContent { get; set; }

		public QuestionDto Question { get; set; }

		public DateTime CreatedAt { get; set; }

		public string Status { get; set; }
	}
}