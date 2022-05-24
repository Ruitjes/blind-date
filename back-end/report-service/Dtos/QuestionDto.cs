using System.ComponentModel.DataAnnotations;

namespace report_service.Dtos
{
	public class QuestionDto
	{
		[Required]
		public string Id { get; set; }

		[Required]
		public string Content { get; set; }
	}
}