using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using question_service.Classes;
using question_service.Configurations;
using question_service.Interfaces;
using question_service.Services;

namespace question_service
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
            ConfigureDatabaseServices(services);

            var configuration = Configuration;

            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.Converters.Add(new ObjectIdConverter());
            });
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyMethod();
                });
            });

            services.AddSingleton<IQuestionService, QuestionService>();
            services.AddSingleton<IBookmarkService, BookmarkService>();
        }

        public void ConfigureAuthentication(IServiceCollection services)
        {
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

        public void ConfigureDatabaseServices(IServiceCollection services)
        {
            var mongoDbSection = Configuration.GetSection(nameof(MongoDbSettings));
            var mongoDbSettings = mongoDbSection.Get<MongoDbSettings>();
            services.AddSingleton<IMongoDbSettings>(mongoDbSettings);
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
