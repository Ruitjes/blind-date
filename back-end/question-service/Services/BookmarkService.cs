using System;
using question_service.Interfaces;
using question_service.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace question_service.Services
{
    public class BookmarkService : IBookmarkService
    {
        private readonly IMongoCollection<Bookmark> _bookmarks;

        public BookmarkService(IMongoDbSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DbName);
            _bookmarks = database.GetCollection<Bookmark>(settings.BookmarkCollectionName);
        }

        public async Task<List<Bookmark>> GetAllAsync()
        {
            return await _bookmarks.Find(s => true).ToListAsync();
        }

        public async Task<Bookmark> GetByIdAsync(ObjectId id)
        {
            return await _bookmarks.Find(s => s.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Bookmark> GetByUserIdentifier(string userIdentifier)
        {
            return await _bookmarks.Find(s => s.UserIdentifier == userIdentifier).FirstOrDefaultAsync();
        }

        public async Task<Bookmark> CreateAsync(Bookmark bookmark)
        {
            await _bookmarks.InsertOneAsync(bookmark);
            return bookmark;
        }

        public async Task<string> UpdateAsync(ObjectId id, Bookmark bookmark)
        {
            await _bookmarks.ReplaceOneAsync(s => s.Id == id, bookmark);
            return "bookmark updated";
        }

        public async Task DeleteAsync(ObjectId id)
        {
            await _bookmarks.DeleteOneAsync(s => s.Id == id);
        }
    }
}



