using admin_service.Models;

namespace admin_service.Dtos
{
	public class ReportReadDto
	{
		public string? Id { get; set; }

		public User? Reporter { get; set; }

		public User? Reported { get; set; }

		public string? ReportedContent { get; set; }

		public Post? Post { get; set; }

		public DateTime CreatedAt { get; set; }

		public string? Status { get; set; }
	}
}