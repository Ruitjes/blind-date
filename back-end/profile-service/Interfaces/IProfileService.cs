﻿using System;
using profile_service.Models;
using MongoDB.Bson;

namespace profile_service.Interfaces
{
    public interface IProfileService
    {
        public Task<List<Profile>> GetAllAsync();
        public Task<string> UpdateAsync(ObjectId? id, Profile profile);
        public Task<string> DeleteAsync(ObjectId? id);
        public Task<Profile> GetProfileByUserIdentifier(string userIdentifier);
        public Task<Profile> CreateAsync(Profile p);
        public string GetUserByJWTToken();
    }
}