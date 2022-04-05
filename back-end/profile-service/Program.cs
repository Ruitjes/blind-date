using profile_service.Interfaces;
using profile_service.Models;
using question_service.Services;

var builder = WebApplication.CreateBuilder(args);

// Enviroment variables for database connnection.
string? connectionString = Environment.GetEnvironmentVariable("MongoDbConnectionString");
string? dbName = Environment.GetEnvironmentVariable("MongoDbName");
string? profileCollectionName = Environment.GetEnvironmentVariable("MongoDbProfileCollectionName");

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IMongoDbSettings>(new MongoDbSettings(connectionString, dbName, profileCollectionName));
builder.Services.AddScoped<IProfileService, ProfileService>();



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

