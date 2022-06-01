using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace question_service.Models
{
    public class Profile
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string OAuthIdentifier { get; set; }

        public string Name { get; set; }

        public string Gender { get; set; }

        public int Age { get; set; }

        public List<string> Interests { get; set; } = new List<string>();

        public string Language { get; set; }

        public Profile(string id, string oAuthIdentifier, string name, string gender, int age, List<string> interests, string language)
        {
            Id = id;
            OAuthIdentifier = oAuthIdentifier;
            Name = name;
            Gender = gender;
            Age = age;
            Interests = interests;
            Language = language;
        }
    }
}