using System;
using question_service.Models;

namespace question_service.Interfaces
{
	public interface IExternalServices
	{
		Task<Profile?> GetProfileWithUserIdentifierAsync(string userIdentifier);
	}
}

