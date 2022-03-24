using System;
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
            var database = client.GetDatabase(settings.DbName);
            _questions = database.GetCollection<Question>(settings.QuestionCollectionName);
        }

        public async Task<List<Question>> GetAllAsync()
        {
            return await _questions.Find(s => true).ToListAsync();
        }

        public async Task<Question> GetByIdAsync(ObjectId id)
        {
            return await _questions.Find(s => s.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Question> GetNextQuestionBasedOnUserBookmark(ObjectId? bookmark)
        {
            if (bookmark == null)
            {
                return await _questions.Find(s => true).FirstOrDefaultAsync();

            }
            else
            {
                return await _questions.Find(s => s.Id > bookmark).SortBy(s => s.Id).Limit(1).FirstOrDefaultAsync();
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

        public async Task DeleteAsync(ObjectId id)
        {
            await _questions.DeleteOneAsync(s => s.Id == id);
        }
    }
}



