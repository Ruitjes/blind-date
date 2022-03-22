using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace feed_service.Models;

public class Bookmark
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string UserIdentifier { get; set; } = null!;

    public string CurrentIndex { get; set; } = null!;
}