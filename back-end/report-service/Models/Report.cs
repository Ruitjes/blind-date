using System.ComponentModel.DataAnnotations;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace report_service.Models
{
	public class Report
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string Id { get; set; }

		[Required]
		public User Reporter { get; set; }

		[Required]
		public User Reported { get; set; }

		// this property will store the content that was reported (either the question id and content or the answer id and content)
		[Required]
		public ReportedContent ReportedContent { get; set; }

		// this property will store the question id and content
		[Required]
		public Question Question { get; set; }

		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		public Status Status { get; set; } = Status.Pending;
	}
}