using profile_service.Configurations;
using profile_service.Interfaces;
using profile_service.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace profile_service.Services
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

        public async Task<Profile> GetProfileByOAuthIdentifier(string oAuthIdentifier)
        {

            Profile profile = await _profiles.Find(s => s.OAuthIdentifier == oAuthIdentifier).FirstOrDefaultAsync();
            return profile;

        }

        public async Task<Profile> CreateAsync(Profile profile)
        {
           if(await GetProfileByOAuthIdentifier(profile.OAuthIdentifier) is var existingProfile && existingProfile is not null) // get profile and check if its not null
            {
                return existingProfile;
            }
            profile.Id = ObjectId.GenerateNewId().ToString();

            await _profiles.InsertOneAsync(profile);
            return profile;
        }

        public async Task<Profile> UpdateAsync(string? id, Profile profile)
        {
            await _profiles.UpdateOneAsync(x => x.Id == id,
            Builders<Profile>.Update.Set(p => p.Interests, profile.Interests)
                                    .Set(p => p.Age, profile.Age)
                                    .Set(p => p.Gender, profile.Gender)
                                    .Set(p => p.Name, profile.Name)
                                    .Set(p => p.Language, profile.Language));
            return profile;
        }

        public async Task<string> DeleteAsync(string? id)
        {
            await _profiles.DeleteOneAsync(s => s.Id == id);
            return "Profile deleted!";
        }

        public string GetUserByJWTToken()
        {
            var userFromJWT = _httpContext.HttpContext.User;
            var userIdentifier = userFromJWT.Claims.Where(claim => claim.Type.Contains("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")).FirstOrDefault().Value;
            return userIdentifier;
        }
    }
}


