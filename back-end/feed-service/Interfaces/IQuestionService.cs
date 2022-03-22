using System;
using feed_service.Models;
using MongoDB.Bson;

namespace feed_service.Interfaces
{
	public interface IQuestionService
	{
        public Task<List<Question>> GetAllAsync();
        public Task<Question> GetByIdAsync(ObjectId id);
        public Task<Question> GetNextQuestionBasedOnUserBookmark(ObjectId? bookmark);
        public Task<List<Question>> GetNextQuestionBatchBasedOnUserBookmark(ObjectId? bookmark);
        public Task<Question> CreateAsync(Question question);
        public Task UpdateAsync(ObjectId id, Question question);
        public Task DeleteAsync(ObjectId id);
    }
}

