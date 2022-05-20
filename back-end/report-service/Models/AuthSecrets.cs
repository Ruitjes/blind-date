namespace report_service.Data
{
	public class AuthSecrets
	{
		public string ClientSecret { get; set; } = null!;
		public string Audience { get; set; } = null!;
		public string ClientID { get; set; } = null!;

		public AuthSecrets(string authSecret, string authAudience, string authClientID)
		{
			if (authSecret == null || authAudience == null || authClientID == null)
			{
				throw new Exception("one of the env variables for auth secrets not set");
			}
			else
			{
				ClientSecret = authSecret;
				Audience = authAudience;
				ClientID = authClientID;
			}
		}
	}
}