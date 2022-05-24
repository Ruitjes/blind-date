using System;
using question_service.Models;
using MongoDB.Bson;

namespace question_service.Interfaces
{
    public interface IQuestionService
    {
        public Task<List<Question>> GetAllAsync();
        public Task<Question> GetByIdAsync(ObjectId id);
        public Task<Question> GetNextQuestionBasedOnUserBookmark(ObjectId? bookmark, string userIdentifier);
        public Task<List<Question>> GetNextQuestionBatchBasedOnUserBookmark(ObjectId? bookmark);
        public Task<Question> CreateAsync(Question question);
        public Task UpdateAsync(ObjectId id, Question question);
        public Task DeleteAsync(ObjectId id);
        public Task<List<Question>> GetQuestionsByUser(string userId);
    }
}
