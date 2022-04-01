using System;
using profile_service.Models;
using MongoDB.Bson;

namespace profile_service.Interfaces
{
    public interface IQuestionService
    {
        public Task<List<Profile>> GetAllAsync();
        public Task<Profile> GetByIdAsync(ObjectId id);
        public Task<Profile> CreateAsync(Profile profile);
        public Task UpdateAsync(ObjectId id, Profile profile);
        public Task DeleteAsync(ObjectId id);
    }
}
