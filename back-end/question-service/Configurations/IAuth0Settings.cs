namespace question_service.Configurations
{
    public interface IAuth0Settings
    {
        string? Audience { get; set; }

        string? Authority { get; set; }
    }
}