using Angular.Models;
using Angular.Models.Blocks;
using Angular.Models.Fields;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Piranha;
using Piranha.AspNetCore.Identity.MySQL;
using Piranha.AspNetCore.Identity.SQLite;
using Piranha.AspNetCore.Identity.SQLServer;
using System;

namespace Angular
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var appsettingsSection = Configuration.GetSection("AppSettings");

            services.AddMvc(config =>
            {
                config.ModelBinderProviders.Insert(0, new Piranha.Manager.Binders.AbstractModelBinderProvider());
            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddPiranhaFileStorage();
            services.AddPiranhaImageSharp();

            var dbType = appsettingsSection["DbType"];
            var connectionString = Configuration.GetConnectionString(dbType);
            if (dbType == "SqlLite")
            {
                services.AddPiranhaEF(options => options.UseSqlite(connectionString));
                services.AddPiranhaIdentityWithSeed<IdentitySQLiteDb>(options => options.UseSqlite(connectionString));
            }
            else if (dbType == "SQLServer")
            {
                services.AddPiranhaEF(options => options.UseSqlServer(connectionString));
                services.AddPiranhaIdentityWithSeed<IdentitySQLServerDb>(options => options.UseSqlServer(connectionString));
            }
            else if (dbType == "MySQL")
            {
                services.AddPiranhaEF(options => options.UseMySql(connectionString));
                services.AddPiranhaIdentityWithSeed<IdentityMySQLDb>(options => options.UseMySql(connectionString));
            }

            services.AddPiranhaManager();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IServiceProvider services)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            // Initialize Piranha
            var api = services.GetService<IApi>();
            App.Init(api);

            // Configure cache level
            App.CacheLevel = Piranha.Cache.CacheLevel.None;

            // Add custom fields
            App.Fields.Register<SizedImageField>();

            // Add custom blocks
            App.Blocks.Register<SliderGroup>();
            App.Blocks.Register<SizedImageBlock>();

            // Build types
            var pageTypeBuilder = new Piranha.AttributeBuilder.PageTypeBuilder(api)
                .AddType(typeof(Models.BlogArchive))
                .AddType(typeof(Models.StandardPage))
                .AddType(typeof(Models.StartPage));
            pageTypeBuilder.Build()
                .DeleteOrphans();
            var postTypeBuilder = new Piranha.AttributeBuilder.PostTypeBuilder(api)
                .AddType(typeof(Models.BlogPost));
            postTypeBuilder.Build()
                .DeleteOrphans();

            // Register middleware
            app.UseAuthentication();
            app.UsePiranhaManager();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(name: "areaRoute",
                  template: "{area:exists}/{controller}/{action}/{id?}",
                  defaults: new { controller = "Home", action = "Index" });

                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                spa.UseSpaPrerendering(options =>
                {
                    options.BootModulePath = $"{spa.Options.SourcePath}/dist-server/main.bundle.js";
                    options.BootModuleBuilder = env.IsDevelopment()
                        ? new AngularCliBuilder(npmScript: "build:ssr")
                        : null;

                    options.SupplyData = (context, data) =>
                        {
                            // Creates a new value called isHttpsRequest that's passed to TypeScript code
                            data["isHttpsRequest"] = context.Request.IsHttps;
                        };
                    options.ExcludeUrls = new[] { "/sockjs-node" };
                });

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
