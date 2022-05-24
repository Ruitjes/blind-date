using System.ComponentModel.DataAnnotations;

namespace report_service.Models
{
	public class User
	{
		[Required]
		public string Id { get; set; }

		[Required]
		public string Name { get; set; }
	}
}