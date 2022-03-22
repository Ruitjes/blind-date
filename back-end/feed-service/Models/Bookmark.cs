using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace feed_service.Models;

public class Bookmark
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId Id { get; set; }

    public string? UserIdentifier { get; set; } = null!;

    public ObjectId? CurrentIndex { get; set; }
}