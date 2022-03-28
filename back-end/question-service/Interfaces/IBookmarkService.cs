using System;
using question_service.Models;
using MongoDB.Bson;

namespace question_service.Interfaces
{
    public interface IBookmarkService
    {
        public Task<List<Bookmark>> GetAllAsync();
        public Task<Bookmark> GetByIdAsync(ObjectId id);
        public Task<Bookmark> GetByUserIdentifier(string userIdentifier);
        public Task<Bookmark> CreateAsync(Bookmark bookmark);
        public Task<string> UpdateAsync(ObjectId id, Bookmark bookmark);
        public Task DeleteAsync(ObjectId id);
    }
}
