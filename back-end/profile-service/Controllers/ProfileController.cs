using profile_service.Interfaces;
using profile_service.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
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
    public async Task<ActionResult<Profile>> GetProfile()
    {
        string userIdentifier = _profileService.GetUserByJWTToken();
        if (userIdentifier == null) return NotFound();
        var profile = await _profileService.GetProfileByOAuthIdentifier(userIdentifier);

        return Ok(profile);
    }

    [HttpPut("UpdateProfile")]
    public async Task<ActionResult<Profile>> UpdateProfile(Profile updatedProfile)
    {
        string userIdentifier = _profileService.GetUserByJWTToken();
        Profile profile = await _profileService.GetProfileByOAuthIdentifier(userIdentifier);

        return Ok(await _profileService.UpdateAsync(profile.Id, updatedProfile));
    }

    [HttpDelete("DeleteProfile")]
    public async Task<string> DeleteProfile()
    {
        string userIdentifier = _profileService.GetUserByJWTToken();
        Profile profile = await _profileService.GetProfileByOAuthIdentifier(userIdentifier);

        return await _profileService.DeleteAsync(profile.Id);
    }

    [HttpPost("CreateProfile")]
    public async Task<ActionResult> CreateProfile(Profile p)
    {
       if (await _profileService.GetProfileByOAuthIdentifier(p.OAuthIdentifier) is null)
        {
          return Ok(await _profileService.CreateAsync(p));
        }
        else
        {
            return Conflict("Profile already exists");
        } 
    }

}