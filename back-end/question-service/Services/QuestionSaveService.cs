using question_service.Configurations;
using question_service.Interfaces;
using question_service.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace question_service.Services
{
    public class QuestionSaveService : IQuestionSaveService
    {
        private readonly IMongoCollection<SavedQuestion> _questions;

        public QuestionSaveService(IMongoDbSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _questions = database.GetCollection<SavedQuestion>("SavedQuestion");
        }

        public async Task<List<SavedQuestion>> GetAllQuestionsSavedByUserAsync(string userIdentifier)
        {
            return await _questions.Find(q => q.SavedBy == userIdentifier).ToListAsync();
        }

        public async Task<SavedQuestion> SaveQuestion(SavedQuestion question)
        {
            await _questions.InsertOneAsync(question);
            return question;
        }

        public async Task<string> RemoveQuestion(ObjectId savedQuestionId)
        {
            await _questions.DeleteOneAsync(q => q.Id == savedQuestionId);
            return "Saved Question deleted";
        }

        public async Task<SavedQuestion> GetSavedQuestionById(ObjectId savedQuestionId)
        {
            return await _questions.Find(q => q.Id == savedQuestionId).FirstOrDefaultAsync();

        }
    }
}



