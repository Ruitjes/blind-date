using upload_service.Configurations;
using upload_service.Interfaces;
using upload_service.Services;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IUploadService, UploadService>();

var amazonS3Section = builder.Configuration.GetSection(nameof(AmazonS3Settings));
var amazonS3Settings = amazonS3Section.Get<AmazonS3Settings>();
builder.Services.AddSingleton<IAmazonS3Settings>(amazonS3Settings);

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

