using profile_service.Configurations;
using profile_service.Interfaces;
using profile_service.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace question_service.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IMongoCollection<Profile> _profiles;
        private readonly IHttpContextAccessor _httpContext;

        public ProfileService(IMongoDbSettings settings, IHttpContextAccessor httpContext)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _profiles = database.GetCollection<Profile>("Profile");
            _httpContext = httpContext;
        }

        public async Task<List<Profile>> GetAllAsync()
        {
            return await _profiles.Find(s => true).ToListAsync();
        }

        public async Task<Profile> GetProfileByUserIdentifier(string userIdentifier)
        {

            Profile profile = await _profiles.Find(s => s.UserIdentifier == userIdentifier).FirstOrDefaultAsync();
            return profile;

        }

        public async Task<Profile> CreateAsync(Profile profile)
        {
            await _profiles.InsertOneAsync(profile);
            return profile;
        }

        public async Task<string> UpdateAsync(ObjectId? id, Profile profile)
        {
            await _profiles.UpdateOneAsync(x => x.Id == id,
        Builders<Profile>.Update.Set(p => p.interests, profile.interests));
            return "Profile updated!";
        }

        public async Task<string> DeleteAsync(ObjectId? id)
        {
            await _profiles.DeleteOneAsync(s => s.Id == id);
            return "Profile deleted!";
        }

        public string GetUserByJWTToken()
        {
            var userFromJWT = _httpContext.HttpContext?.User;
            string userIdentifier = userFromJWT.Claims.Where(claim => claim.Type.Contains("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")).FirstOrDefault().Value;
            return userIdentifier;
        }
    }
}


