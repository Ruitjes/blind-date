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

// DB Settings
builder.Services.AddSingleton(new ReportsDatabaseSettings(
	connectionString, databaseName, reportsCollectionName
));

// DB class
builder.Services.AddScoped<IReportsService, ReportsService>();

// Automapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
// ----------------


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
