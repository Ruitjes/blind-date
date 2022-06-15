using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using report_service.Configurations;
using report_service.Data;
using report_service.Services;

namespace report_service
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            ConfigureAuthentication(services);
            ConfigureSwaggerServices(services);

			services.AddControllers();
			services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            // Enviroment variables for database connnection
            string connectionString = Environment.GetEnvironmentVariable("DbConnectionString");
            string databaseName = Environment.GetEnvironmentVariable("DbName");
            string reportsCollectionName = Environment.GetEnvironmentVariable("DbReportCollectionName");

           // DB Settings
            services.AddSingleton(new ReportsDatabaseSettings(
                connectionString, databaseName, reportsCollectionName
            ));

            // DB class
            services.AddScoped<IReportsService, ReportsService>();

            // Automapper
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddHttpContextAccessor();
        }

        public void ConfigureAuthentication(IServiceCollection services)
        {
            // Auth0 Settings
            var auth0Section = Configuration.GetSection(nameof(Auth0Settings));
            var auth0Settings = auth0Section.Get<Auth0Settings>();
            services.AddSingleton<IAuth0Settings>(auth0Settings);

            services
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
        }

        public void ConfigureSwaggerServices(IServiceCollection services)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseHsts();

                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}