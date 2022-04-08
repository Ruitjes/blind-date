using profile_service.Interfaces;
using profile_service.Models;
using question_service.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Enviroment variables for database connnection.
string? connectionString = Environment.GetEnvironmentVariable("MongoDbConnectionString");
string? dbName = Environment.GetEnvironmentVariable("MongoDbName");
string? profileCollectionName = Environment.GetEnvironmentVariable("MongoDbProfileCollectionName");
//Auth
string? domain = Environment.GetEnvironmentVariable("Auth0Domain");
string? audience = Environment.GetEnvironmentVariable("Auth0Audience");

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IMongoDbSettings>(new MongoDbSettings(connectionString, dbName, profileCollectionName));
builder.Services.AddScoped<IProfileService, ProfileService>();

builder.Services.AddHttpContextAccessor();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {

        options.Authority = domain;
        options.Audience = audience;
        // If the access token does not have a `sub` claim, `User.Identity.Name` will be `null`. Map it to a different claim by setting the NameClaimType below.
        options.TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = "Role",
            RoleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        };
    });
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
