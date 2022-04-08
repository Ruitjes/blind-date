using System.ComponentModel.DataAnnotations;

namespace report_service.Models
{
	public class User
	{
		[Required]
		public int UserId { get; set; }

		[Required]
		public string? Name { get; set; }
	}
}