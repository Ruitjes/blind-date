namespace question_service.Configurations
{
    public class Auth0Settings : IAuth0Settings
    {
        public string? Authority { get; set; }

        public string? Audience { get; set; }
    }
}
