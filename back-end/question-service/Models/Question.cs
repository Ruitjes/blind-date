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
}