using System;
using Microsoft.AspNetCore.Mvc;

namespace profile_service.Services
{
	public interface IAdminService
	{
		Task<ActionResult<string>> ManageUserBlock(string userIdentifier, bool blockStatus);
		Task<ActionResult<string>> SetUserProfileCreatedStatus(string userIdentifier, bool profileCreatedStatus);
	}
}

