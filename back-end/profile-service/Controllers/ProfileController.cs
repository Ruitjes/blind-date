using profile_service.Interfaces;
using profile_service.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using MongoDB.Bson;
using profile_service.Messaging;

namespace profile_service.Controllers;

[ApiController]
[Route("[controller]")]
public class ProfileController : Controller
{

    private readonly IProfileService _profileService;
    private readonly IMessageBusPublisher _messageBusPublisher;

    public ProfileController(IProfileService profileService, IMessageBusPublisher messageBusPublisher)
    {
        _profileService = profileService;
        _messageBusPublisher = messageBusPublisher;
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
    public async Task<ActionResult<Profile>> UpdateProfile(Profile p)
    {
        string userIdentifier = _profileService.GetUserByJWTToken();
        Profile profile = await _profileService.GetProfileByOAuthIdentifier(userIdentifier);
        Profile updatedProfile = await _profileService.UpdateAsync(profile.Id, p);
         _messageBusPublisher.PublishMessage("UpdatedUser", updatedProfile);

        return Ok(updatedProfile);
    }

    [HttpDelete("DeleteProfile")]
    public async Task<string> DeleteProfile()
    {
        string userIdentifier = _profileService.GetUserByJWTToken();
        Profile profile = await _profileService.GetProfileByOAuthIdentifier(userIdentifier);
         _messageBusPublisher.PublishMessage("DeletedUser", profile);

        return await _profileService.DeleteAsync(profile.Id);
    }

    [HttpPost("CreateProfile")]
    public async Task<ActionResult> CreateProfile(Profile p)
    {
       if (await _profileService.GetProfileByOAuthIdentifier(p.OAuthIdentifier) is null)
        {
            Profile profile = await _profileService.CreateAsync(p);
            _messageBusPublisher.PublishMessage("NewUser", profile);

            return Ok(profile);
        }
        else
        {
            return Conflict("Profile already exists");
        } 
    }

}