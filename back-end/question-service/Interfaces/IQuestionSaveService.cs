using System;
using question_service.Models;
using MongoDB.Bson;

namespace question_service.Interfaces
{
    public interface IQuestionSaveService
    {
        public Task<List<SavedQuestion>> GetAllQuestionsSavedByUserAsync(string userIdentifier);
        public Task<SavedQuestion> SaveQuestion(SavedQuestion question);
        public Task<string> RemoveQuestion(ObjectId savedQuestionId);
    }
}
