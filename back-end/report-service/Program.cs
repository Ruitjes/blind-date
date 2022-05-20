using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using profile_service.Configurations;
using report_service.Data;
using report_service.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// ----------------
// Enviroment variables for database connnection
string connectionString = Environment.GetEnvironmentVariable("DbConnectionString");
string databaseName = Environment.GetEnvironmentVariable("DbName");
string reportsCollectionName = Environment.GetEnvironmentVariable("DbReportCollectionName");

// Enviroment variables for management api
string auth_secret = Environment.GetEnvironmentVariable("AUTH0_MANAGEMENT_SECRET");
string auth_client = Environment.GetEnvironmentVariable("AUTH0_MANAGEMENT_CLIENT_ID");
string auth_audience = Environment.GetEnvironmentVariable("AUTH0_MANAGEMENT_AUDIENCE");

// Auth secrets
builder.Services.AddSingleton(new AuthSecrets(auth_secret,auth_audience,auth_client));

// DB Settings
builder.Services.AddSingleton(new ReportsDatabaseSettings(
	connectionString, databaseName, reportsCollectionName
));

// DB class
builder.Services.AddScoped<IReportsService, ReportsService>();

// Admin service scoped
builder.Services.AddScoped<IAdminService, AdminService>();

// Automapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
// ----------------

// Auth0 Settings
var auth0Section = builder.Configuration.GetSection(nameof(Auth0Settings));
var auth0Settings = auth0Section.Get<Auth0Settings>();
builder.Services.AddSingleton<IAuth0Settings>(auth0Settings);

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Audience = auth0Settings.Audience;
        options.Authority = auth0Settings.Authority;

        // If the access token does not have a `sub` claim, `User.Identity.Name` will be `null`.
        // Map it to a different claim by setting the NameClaimType below.
        options.TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = "Role",
            RoleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        };
    });

builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
