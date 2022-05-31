using MongoDB.Bson;

namespace question_service.Events
{
    public class DeleteAnswerEvent
    {
        public ObjectId Id { get; set; }
    }
}
