using MongoDB.Bson;

namespace question_service.Events
{
    public class CreateAnswerEvent
    {
        public string? QuestionId { get; set; }
    }
}
