using profile_service.Configurations;
using profile_service.Interfaces;
using profile_service.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using Auth0.ManagementApi;
using Auth0.ManagementApi.Models;
using Auth0.Core.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace profile_service.Services
{
    public class ProfileService : IProfileService
    {
        private readonly AuthSecrets _authSecrets;
        private readonly IMongoCollection<Profile> _profiles;
        private readonly IHttpContextAccessor _httpContext;

        public ProfileService(AuthSecrets authSecrets, IMongoDbSettings settings, IHttpContextAccessor httpContext)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _profiles = database.GetCollection<Profile>("Profile");
            _httpContext = httpContext;
            _authSecrets = authSecrets;
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
                                    .Set(p => p.Birthdate, profile.Birthdate)
                                    .Set(p => p.Gender, profile.Gender)
                                    .Set(p => p.Name, profile.Name)
                                    .Set(p => p.Language, profile.Language));
            return profile;
        }

        public async Task<ActionResult<string>> DeleteAsync(string? authIdentifier)
        {
            try
            {
               string mgmtToken = await GetManagementTokenAsync();
               using var mgmtClient = new ManagementApiClient(mgmtToken, new Uri("https://blind-date.eu.auth0.com/api/v2"));

               await _profiles.DeleteOneAsync(s => s.OAuthIdentifier == authIdentifier);   
                
               await mgmtClient.Users.DeleteAsync(authIdentifier);

               return new ObjectResult("Successfully deleted") { StatusCode = 200 };
            }
          
            catch (Exception ex)
            {
                return new ObjectResult($"Invalid Auth0 ID given. {ex}") { StatusCode = 400 };
            }
        }

        public string GetUserByJWTToken()
        {
            var userFromJWT = _httpContext.HttpContext.User;
            var userIdentifier = userFromJWT.Claims.Where(claim => claim.Type.Contains("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")).FirstOrDefault().Value;
            return userIdentifier;
        }

        private async Task<string> GetManagementTokenAsync()
        {
            using var client = new HttpClient();
            client.BaseAddress = new Uri("https://blind-date.eu.auth0.com/");

            var response = await client.PostAsync("oauth/token", new FormUrlEncodedContent(
                new Dictionary<string, string>
                {
                        { "grant_type", "client_credentials" },
                        { "client_id", _authSecrets.ClientID },
                        { "client_secret", _authSecrets.ClientSecret },
                        { "audience", _authSecrets.Audience }
                }
            ));

            var content = await response.Content.ReadAsStringAsync();
            var jsonResult = JObject.Parse(content);
            var mgmtToken = jsonResult["access_token"]?.Value<string>() ?? "";
            return mgmtToken;
        }
    }
}


