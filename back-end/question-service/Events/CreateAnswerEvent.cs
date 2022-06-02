using MongoDB.Bson;

namespace question_service.Events
{
    public class CreateAnswerEvent
    {
        public ObjectId Id { get; set; }
    }
}
