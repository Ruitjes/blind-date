using question_service.Interfaces;
using question_service.Models;
using question_service.Services;

var builder = WebApplication.CreateBuilder(args);

// Enviroment variables for database connnection.
string? connectionString = Environment.GetEnvironmentVariable("MongoDbConnectionString");
string? dbName = Environment.GetEnvironmentVariable("MongoDbName");
string? questionCollectionName = Environment.GetEnvironmentVariable("MongoDbQuestionCollectionName");
string? bookmarkCollectionName = Environment.GetEnvironmentVariable("MongoDbBookmarkCollectionName");

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IMongoDbSettings>(new MongoDbSettings(connectionString, dbName, questionCollectionName, bookmarkCollectionName));
builder.Services.AddScoped<IQuestionService, QuestionService>();
builder.Services.AddScoped<IBookmarkService, BookmarkService>();



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
