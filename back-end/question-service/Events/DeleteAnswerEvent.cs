using MongoDB.Bson;

namespace question_service.Events
{
    public class DeleteAnswerEvent
    {
        public string? QuestionId { get; set; }
    }
}
