using System;
using feed_service.Models;

namespace feed_service.Interfaces
{
	public interface IBookmarkService
	{
        public Task<List<Bookmark>> GetAllAsync();
        public Task<Bookmark> GetByIdAsync(string id);
        public Task<Bookmark> CreateAsync(Bookmark question);
        public Task UpdateAsync(string id, Bookmark question);
        public Task DeleteAsync(string id);
    }
}

