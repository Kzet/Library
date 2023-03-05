
using Core.Interfaces;
using Data;
using Microsoft.EntityFrameworkCore;
using Services;

namespace Library
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddDbContext<Context>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("ExternalDbConnection")));

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                                      builder
                                          .WithOrigins("http://localhost", "http://localhost:90", "http://localhost:4200",
                                                       "http://localhost:4300")
                                          .AllowAnyMethod()
                                          .AllowAnyHeader()
                                          .AllowCredentials());
            });
            builder.Services.AddScoped<IClientsService, ClientsService>();
            builder.Services.AddScoped<IBooksService, BooksService>();
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseEndpoints(endpoints =>
                endpoints.MapControllers()
                );

            app.Run();
        }
    }
}