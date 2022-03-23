using Microsoft.AspNetCore.Builder;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

IConfiguration configuration = new ConfigurationBuilder()
                            .AddJsonFile("ocelot.json")
                            .Build();

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerForOcelot(configuration);
builder.Services.AddOcelot(configuration);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowedOrigin",
    b =>
    {
        b.AllowAnyOrigin();
        b.AllowAnyHeader();
        b.AllowAnyMethod();  
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerForOcelotUI(options =>
    {
        options.PathToSwaggerGenerator = "/swagger/docs";
        options.RoutePrefix = string.Empty;
    });
}

app.UseCors("AllowedOrigin");

app.UseHttpsRedirection();

app.UseOcelot();

app.Run();