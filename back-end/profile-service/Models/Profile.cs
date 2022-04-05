using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace profile_service.Models
{
    public class Profile
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId? Id { get; set; }

        public string? UserIdentifier { get; set; }

        public List<string> interests { get; set; }
    }
}
