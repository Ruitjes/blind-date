using System;
using profile_service.Models;
using MongoDB.Bson;

namespace profile_service.Interfaces
{
    public interface IProfileService
    {
        public Task<List<Profile>> GetAllAsync();
        public Task<ObjectId> GetObjectIdByUserIdentifierAsync(string userIdentifier);
        public Task<string> UpdateAsync(ObjectId id, Profile profile);
        public Task<string> DeleteAsync(ObjectId id);
        public Task<Profile> GetProfileByUserIdentifierAsync(string userIdentifier);
        Task<Profile> CreateAsync(Profile p);
    }
}
