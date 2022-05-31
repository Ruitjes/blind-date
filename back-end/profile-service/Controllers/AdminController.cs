using profile_service.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using profile_service.Interfaces;
using profile_service.Messaging;
using profile_service.Models;

namespace profile_service.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        private readonly IProfileService _profileService;
        private readonly IMessageBusPublisher _messageBusPublisher;
        private readonly ILogger<AdminController> _logger;

        public AdminController(IAdminService adminService, IProfileService profileService, IMessageBusPublisher messageBusPublisher, ILogger<AdminController> logger)
        {
            _adminService = adminService;
            _profileService = profileService;
            _messageBusPublisher = messageBusPublisher;
            _logger = logger;
        }

        [HttpGet("BlockUser/{userIdentifier}")]
        public async Task<ActionResult<string>> BlockUser(string userIdentifier)
        {   
            // Delete users profile
            Profile profile = await _profileService.GetProfileByOAuthIdentifier(userIdentifier);
            if (profile != null)
            {
                try
                {
                    _messageBusPublisher.PublishMessage("BlockedUser", profile);
                }
                catch(Exception ex)
                {
                    _logger.LogError(ex, "Something went wrong trying to send a message with rabbitmq");
                }
                await _profileService.DeleteAsync(profile.Id);
            }
            // Block user in Auth0
            return await _adminService.ManageUserBlock(userIdentifier, true);
        }

        [HttpGet("UnblockUser/{userIdentifier}")]
        public async Task<ActionResult<string>> UnblockUser(string userIdentifier)
        {
            return await _adminService.ManageUserBlock(userIdentifier, false);
        }
    }
}