using System.ComponentModel.DataAnnotations;
using admin_service.Models;

namespace admin_service.Dtos
{
	public class ReportCreateDto
	{
		[Required]
		public User? Reporter { get; set; }

		[Required]
		public User? Reported { get; set; }

		[Required]
		public string? ReportedContent { get; set; }

		[Required]
		public Post? Post { get; set; }
	}
}