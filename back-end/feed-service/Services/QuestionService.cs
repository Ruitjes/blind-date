using System;
using feed_service.Interfaces;
using feed_service.Models;
using MongoDB.Driver;

namespace feed_service.Services
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

        public async Task<Question> GetByIdAsync(string id)
        {
            return await _questions.Find(s => s.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Question> CreateAsync(Question question)
        {
            await _questions.InsertOneAsync(question);
            return question;
        }

        public async Task UpdateAsync(string id, Question question)
        {
            await _questions.ReplaceOneAsync(s => s.Id == id, question);
        }

        public async Task DeleteAsync(string id)
        {
            await _questions.DeleteOneAsync(s => s.Id == id);
        }
    }
}



