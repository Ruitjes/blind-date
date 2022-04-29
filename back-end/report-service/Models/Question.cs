using System.ComponentModel.DataAnnotations;

namespace report_service.Models
{
	public class Question
	{
		[Required]
		public int QuestionId { get; set; }

		[Required]
		public string QuestionContent { get; set; }
	}
}