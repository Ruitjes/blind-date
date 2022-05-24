using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace question_service.Models;

public class Question
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId? Id { get; set; }

    public string? Content { get; set; }

    public DateTime? AddedOn { get; set; }

    public string? UserIdentifier { get; set; }

    public string? FileName { get; set; }

    public bool Deleted { get; set; } = false;

    // Offcourse you would rather have an ID of a linked interest here so you don't need to string match.
    // You would also want Interests to be managed by the admin of the platfrom so that no weird or uncanny interests get added.
    public string LinkedInterest { get; set; } = "";
}