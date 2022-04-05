using System.ComponentModel;

namespace admin_service.Models
{
	public enum Status
	{
		[Description("Pending")]
		Pending = 1,

		[Description("Resolved")]
		Resolved = 2,

		[Description("Ignored")]
		Ignored = 3
	}
}