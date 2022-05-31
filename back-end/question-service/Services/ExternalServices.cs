using System;
using Newtonsoft.Json;
using question_service.Interfaces;
using question_service.Models;

namespace question_service.Services
{
	public class ExternalServices : IExternalServices
	{
        public ExternalServices() { }

		public async Task<Profile?> GetProfileWithUserIdentifierAsync(string userIdentifier)
        {
            using var httpClient = new HttpClient();
            httpClient.Timeout = TimeSpan.FromSeconds(5); //timeout after 5 seconds

            using (var response = await httpClient.GetAsync($"http://profile-service/Profile/GetProfileWithUserIdentifier/{userIdentifier}"))
            {
                string json = await response.Content.ReadAsStringAsync();
                if (response.IsSuccessStatusCode)
                {
                    return JsonConvert.DeserializeObject<Profile>(json);
                }
                else
                {
                    return null;
                }
            }
        }
	}
}

