using question_service.Configurations;
using question_service.Interfaces;
using question_service.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace question_service.Services
{
    public class QuestionService : IQuestionService
    {
        private readonly IMongoCollection<Question> _questions;

        public QuestionService(IMongoDbSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _questions = database.GetCollection<Question>("Question");
        }

        public async Task<List<Question>> GetAllAsync()
        {
            return await _questions.Find(s => true).ToListAsync();
        }

        public async Task<Question> GetByIdAsync(ObjectId id)
        {
            return await _questions.Find(s => s.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Question> GetNextQuestionBasedOnUserBookmark(ObjectId? bookmark, string userIdentifier)
        {
            if (bookmark == null)
            {
                return await _questions.Find(s => s.UserIdentifier != userIdentifier && s.Deleted == false).FirstOrDefaultAsync();

            }
            else
            {
                return await _questions.Find(s => s.Id > bookmark && s.UserIdentifier != userIdentifier && s.Deleted == false).SortBy(s => s.Id).Limit(1).FirstOrDefaultAsync();
            }
        }

        public async Task<List<Question>> GetNextQuestionBatchBasedOnUserBookmark(ObjectId? bookmark)
        {
            if (bookmark == null)
            {
                return await _questions.Find(s => true).Limit(5).ToListAsync();
            }
            else
            {
                return await _questions.Find(s => s.Id > bookmark).Limit(5).ToListAsync();
            }
        }

        public async Task<Question> CreateAsync(Question question)
        {
            await _questions.InsertOneAsync(question);
            return question;
        }

        public async Task UpdateAsync(ObjectId id, Question question)
        {
            await _questions.ReplaceOneAsync(s => s.Id == id, question);
        }

        public async Task<Question> DeleteAsync(ObjectId questionId)
        {
            var update = Builders<Question>.Update
                            .Set(q => q.FileName, "deleted")
                            .Set(q => q.Content, "deleted")
                            .Set(q => q.Deleted, true);

            return await _questions.FindOneAndUpdateAsync(s => s.Id == questionId, update);
        }

        public async Task<List<Question>> GetQuestionsByUser(string userId)
        {
            return await _questions.Find(s => s.UserIdentifier == userId).ToListAsync();
        }
    }
}



