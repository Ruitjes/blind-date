using System.ComponentModel.DataAnnotations;

namespace admin_service.Models
{
	public class Report
	{
		[Key]
		[Required]
		public int Id { get; set; }

		[Required]
		public User? Reporter { get; set; }

		[Required]
		public User? Reported { get; set; }

		[Required]
		public string? ReportedContent { get; set; }

		[Required]
		public Post? Post { get; set; }

		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		public Status Status { get; set; } = Status.Pending;
	}
}