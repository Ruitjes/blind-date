using System.ComponentModel.DataAnnotations;

namespace report_service.Models
{
	public class ReportedContent
	{
		[Required]
		public string Id { get; set; }

		[Required]
		public string Content { get; set; }
	}
}