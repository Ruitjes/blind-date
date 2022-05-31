using System.ComponentModel.DataAnnotations;

namespace report_service.Models
{
	public class Question
	{
		[Required]
		public string Id { get; set; }

		[Required]
		public string Content { get; set; }
	}
}