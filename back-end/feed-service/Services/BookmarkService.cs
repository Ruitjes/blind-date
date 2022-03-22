using System;
using feed_service.Interfaces;
using feed_service.Models;
using MongoDB.Driver;

namespace feed_service.Services
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

        public async Task<Bookmark> GetByIdAsync(string id)
        {
            return await _bookmarks.Find(s => s.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Bookmark> CreateAsync(Bookmark bookmark)
        {
            await _bookmarks.InsertOneAsync(bookmark);
            return bookmark;
        }

        public async Task UpdateAsync(string id, Bookmark bookmark)
        {
            await _bookmarks.ReplaceOneAsync(s => s.Id == id, bookmark);
        }

        public async Task DeleteAsync(string id)
        {
            await _bookmarks.DeleteOneAsync(s => s.Id == id);
        }
    }
}



