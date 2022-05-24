using System;
using Newtonsoft.Json.Linq;
using profile_service.Models;
using Auth0.ManagementApi;
using Auth0.ManagementApi.Models;
using Auth0.Core.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace profile_service.Services
{
	public class AdminService : IAdminService
	{

        private readonly AuthSecrets _authSecrets;
        private readonly ILogger<AdminService> _logger;

        public AdminService(AuthSecrets authSecrets, ILogger<AdminService> logger)
        {
            _authSecrets = authSecrets;
            _logger = logger;
        }

        public async Task<ActionResult<string>> ManageUserBlock(string userIdentifier,bool blockStatus)
        {
            try
            {
                string mgmtToken = await GetManagementTokenAsync();

                using var mgmtClient = new ManagementApiClient(mgmtToken, new Uri("https://blind-date.eu.auth0.com/api/v2"));
                // Could retrieve user and check if already blocked or update model and then send it again to management api.
                //User user = await mgmtClient.Users.GetAsync(userIdentifier);

                // Set user blocked boolean to blockStatus.
                User user = await mgmtClient.Users.UpdateAsync(userIdentifier, new UserUpdateRequest { Blocked = blockStatus });

                bool UserIsBlocked = user?.Blocked ?? false;

                return new ObjectResult(UserIsBlocked ? $"{user.FullName} successfully blocked" : $"{user.FullName} successfully unblocked") {StatusCode = 200 };
            }
            catch(ErrorApiException apiError)
            {
                _logger.LogError(apiError, "Probably invalid Auth0 ID given, but logging for analysis");
                return new ObjectResult("Invalid Auth0 ID given") { StatusCode = 400 };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Something went wrong at BlockUser in the AdminService");
                return new ObjectResult("Something went wrong trying to block a user with the management API") { StatusCode = 500 };

            }
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

