using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace feed_service.Models;

public class Question
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId? Id { get; set; }

    public string Content { get; set; } = null!;

    public DateTime AddedOn { get; set; }
}