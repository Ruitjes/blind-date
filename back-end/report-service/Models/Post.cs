using System.ComponentModel.DataAnnotations;

namespace report_service.Models
{
	public class Post
	{
		[Required]
		public int PostId { get; set; }

		[Required]
		public string? PostContent { get; set; }
	}
}