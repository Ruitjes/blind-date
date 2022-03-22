using System;
using feed_service.Models;

namespace feed_service.Interfaces
{
	public interface IQuestionService
	{
        public Task<List<Question>> GetAllAsync();
        public Task<Question> GetByIdAsync(string id);
        public Task<Question> CreateAsync(Question question);
        public Task UpdateAsync(string id, Question question);
        public Task DeleteAsync(string id);
    }
}

