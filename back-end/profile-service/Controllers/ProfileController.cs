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

    [HttpGet("GetProfile/{userIdentifier}")]
    public async Task<Profile> GetProfileById(string userIdentifier)
    {
        return await _profileService.GetProfileByUserIdentifier(userIdentifier);
    }


    [HttpPut("UpdateInterests/{userIdentifier}")]
    public async Task<string> UpdateInterests(string userIdentifier, Profile updatedProfile)
    {
        ObjectId id = await _profileService.GetIdByIdentifierAsync(userIdentifier);
        return await _profileService.UpdateAsync(id, updatedProfile);

    }
    [HttpDelete("DeleteProfile/{userIdentifier}")]
    public async Task<string> DeleteProfile(string userIdentifier)
    {
        ObjectId id = await _profileService.GetIdByIdentifierAsync(userIdentifier);
        return await _profileService.DeleteAsync(id);

    }

}