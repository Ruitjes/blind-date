using profile_service.Interfaces;
using profile_service.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace profile_service.Controllers;

[ApiController]
[Route("[controller]")]
public class ProfileController : Controller
{

    private readonly IProfileService _profileService;

    public ProfileController(IProfileService profileService)
    {
        _profileService = profileService;
    }

    [HttpGet("GetAllProfiles")]
    public async Task<IEnumerable<Profile>> GetAllProfiles()
    {
        return await _profileService.GetAllAsync();
    }

    [HttpGet("GetProfile")]
    public async Task<Profile> GetProfile()
    {
       string userIdentifier = _profileService.GetUserByJWTToken();
        return await _profileService.GetProfileByUserIdentifier(userIdentifier);
    }


    [HttpPut("UpdateInterests")]
    public async Task<string> UpdateInterests(Profile updatedProfile)
    {
        string userIdentifier = _profileService.GetUserByJWTToken();
        Profile profile = await _profileService.GetProfileByUserIdentifier(userIdentifier);
        return await _profileService.UpdateAsync(profile.Id, updatedProfile);

    }
    [HttpDelete("DeleteProfile")]
    public async Task<string> DeleteProfile()
    {
        string userIdentifier = _profileService.GetUserByJWTToken();
        Profile profile = await _profileService.GetProfileByUserIdentifier(userIdentifier);
        return await _profileService.DeleteAsync(profile.Id);

    }
    [HttpPost("CreateProfile")]
    public async Task<Profile> CreateProfile(Profile p)
    {
        p.Id = ObjectId.GenerateNewId();
        p.UserIdentifier = _profileService.GetUserByJWTToken();
        return await _profileService.CreateAsync(p);
    }

}