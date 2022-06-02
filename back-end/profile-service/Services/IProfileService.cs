using System;
using profile_service.Models;
using MongoDB.Bson;

namespace profile_service.Interfaces
{
    public interface IProfileService
    {
        public Task<List<Profile>> GetAllAsync();
        public Task<Profile> UpdateAsync(string? id, Profile profile);
        public Task<string> DeleteAsync(string? id);
        public Task<Profile> GetProfileByOAuthIdentifier(string userIdentifier);
        public Task<Profile> CreateAsync(Profile p);
        public string GetUserByJWTToken();
    }
}