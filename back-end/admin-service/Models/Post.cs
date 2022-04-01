using System.ComponentModel.DataAnnotations;

namespace admin_service.Models
{
	public class Post
	{
		[Required]
		public int PostId { get; set; }

		[Required]
		public string? PostContent { get; set; }
	}
}