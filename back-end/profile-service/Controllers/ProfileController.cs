using profile_service.Interfaces;
using profile_service.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using MongoDB.Bson;
using profile_service.Messaging;
using profile_service.Services;

namespace profile_service.Controllers;

[ApiController]
[Route("[controller]")]
public class ProfileController : Controller
{

    private readonly IProfileService _profileService;
    private readonly IAdminService _adminService;
    private readonly IMessageBusPublisher _messageBusPublisher;

    public ProfileController(IProfileService profileService, IMessageBusPublisher messageBusPublisher, IAdminService adminService)
    {
        _profileService = profileService;
        _adminService = adminService;
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

    [HttpGet("GetProfileWithUserIdentifier/{userIdentifier}")]
    public async Task<ActionResult<Profile>> GetProfile(string userIdentifier)
    {
        var profile = await _profileService.GetProfileByOAuthIdentifier(userIdentifier);
        if (profile == null) return NotFound();

        return Ok(profile);
    }

    [HttpPut("UpdateProfile")]
    public async Task<ActionResult<Profile>> UpdateProfile(Profile p)
    {
        string userIdentifier = _profileService.GetUserByJWTToken();
        Profile profile = await _profileService.GetProfileByOAuthIdentifier(userIdentifier);
        Profile updatedProfile = await _profileService.UpdateAsync(profile.Id, p);
        await _adminService.SetUserProfileCreatedStatus(p.OAuthIdentifier, true);
        _messageBusPublisher.PublishMessage("UpdatedUser", updatedProfile);


        return Ok(updatedProfile);
    }

  [HttpDelete("DeleteProfile")]
  public async Task<ActionResult<string>> DeleteProfile()
  {
        string userIdentifier = _profileService.GetUserByJWTToken();
        Profile profile = await _profileService.GetProfileByOAuthIdentifier(userIdentifier);
        if (profile is not null)
        {
            try
            {
                _messageBusPublisher.PublishMessage("DeletedUser", profile);
            }
            catch (Exception)
            {
                return new ObjectResult("Something went wrong trying to send a message with rabbitmq") { StatusCode = 500 };
            }
        }

        return await _profileService.DeleteAsync(profile.OAuthIdentifier);
  }

    [HttpPost("CreateProfile")]
    public async Task<ActionResult> CreateProfile(Profile p)
    {
        if (await _profileService.GetProfileByOAuthIdentifier(p.OAuthIdentifier) is null)
        {
            Profile profile = await _profileService.CreateAsync(p);
            await _adminService.SetUserProfileCreatedStatus(p.OAuthIdentifier, true);
            _messageBusPublisher.PublishMessage("NewUser", profile);

            return Ok(profile);
        }
        else
        {
            return Conflict("Profile already exists");
        }
    }
}