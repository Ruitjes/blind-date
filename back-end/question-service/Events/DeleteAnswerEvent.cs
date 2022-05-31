using MongoDB.Bson;

namespace question_service.Events
{
    public class CreateDeleteAnswer
    {
        public ObjectId Id { get; set; }
    }
}
