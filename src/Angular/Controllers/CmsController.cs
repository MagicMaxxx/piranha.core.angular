using Angular.Converters;
using Angular.Models.Blocks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Piranha;
using Piranha.Extend.Blocks;
using Piranha.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Angular.Controllers
{
    /// <summary>
    /// Simple controller for handling the CMS API content from Piranha.
    /// </summary>
    [Route("api/[controller]")]
    public class CmsController : Controller
    {
        /// <summary>
        /// The private api.
        /// </summary>
        private readonly IApi api;

        /// <summary>
        /// The private serializerSettings.
        /// </summary>
        private readonly JsonSerializerSettings serializerSettings;

        /// <summary>
        /// Default construtor.
        /// </summary>
        /// <param name="api">The current api</param>
        public CmsController(IApi api)
        {
            this.api = api;

            serializerSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented
            };

            serializerSettings.Converters.Add(new ClassNameCoverter<HtmlBlock>());
            serializerSettings.Converters.Add(new ClassNameCoverter<HtmlColumnBlock>());
            serializerSettings.Converters.Add(new ClassNameCoverter<ImageBlock>());
            serializerSettings.Converters.Add(new ClassNameCoverter<SizedImageBlock>());
            serializerSettings.Converters.Add(new ClassNameCoverter<QuoteBlock>());
            serializerSettings.Converters.Add(new ClassNameCoverter<TextBlock>());
            serializerSettings.Converters.Add(new SizedImageCoverter(api));
            serializerSettings.Converters.Add(new ImageCoverter(api));
            serializerSettings.Converters.Add(new PageFieldCoverter());
            serializerSettings.Converters.Add(new PostFieldCoverter());
        }

        /// <summary>
        /// Gets the sitemap with the specified id or default sitemap if Empty.
        /// </summary>
        /// <param name="id">The unique id</param>
        [HttpGet("sitemap")]
        public IActionResult Sitemap(Guid? id = null)
        {
            var model = GetSiteMap(id);

            var json = JsonConvert.SerializeObject(model, serializerSettings);
            return new OkObjectResult(json);
        }

        private Sitemap GetSiteMap(Guid? id = null)
        {
            var model = api.Sites.GetSitemap(id);

            foreach (var partial in model)
            {
                if (partial.PageTypeName == "Blog Archive")
                {
                    ((List<SitemapItem>)partial.Items).AddRange(GetArchiveItems(partial));
                }
            }

            return model;
        }

        private List<SitemapItem> GetArchiveItems(SitemapItem partial)
        {
            var model = new List<SitemapItem>();
            var posts = api.Posts.GetAll(partial.Id).Where(p => p.Published <= DateTime.Now).ToList();

            var sortOrder = 0;

            foreach (DynamicPost item in posts)
            {
                var smItem = new SitemapItem
                {
                    ParentId = partial.Id,
                    SortOrder = sortOrder++,
                    Title = item.Title,
                    NavigationTitle = item.Title,
                    PageTypeName = item.TypeId,
                    Permalink = item.Permalink,
                    Published = item.Published,
                    Created = item.Created,
                    LastModified = item.LastModified,
                    Id = item.Id,
                    Level = partial.Level + 1
                };
                model.Add(smItem);
            }

            var categories = api.Categories.GetAll(partial.Id).ToList();
            foreach (var category in categories)
            {
                var smItem = new SitemapItem
                {
                    ParentId = partial.Id,
                    SortOrder = sortOrder++,
                    Title = category.Title,
                    NavigationTitle = category.Title,
                    PageTypeName = "Category",
                    Permalink = $"{partial.Permalink}/category/{category.Slug}",
                    Created = category.Created,
                    LastModified = category.LastModified,
                    Id = category.Id,
                    Level = partial.Level + 1,
                    IsHidden = true
                };
                model.Add(smItem);
            }

            var tags = api.Tags.GetAll(partial.Id).ToList();
            foreach (var tag in tags)
            {
                var smItem = new SitemapItem
                {
                    ParentId = partial.Id,
                    SortOrder = sortOrder++,
                    Title = tag.Title,
                    NavigationTitle = tag.Title,
                    PageTypeName = "Tag",
                    Permalink = $"{partial.Permalink}/tag/{tag.Slug}",
                    Created = tag.Created,
                    LastModified = tag.LastModified,
                    Id = tag.Id,
                    Level = partial.Level + 1,
                    IsHidden = true
                };
                model.Add(smItem);
            }

            return model;
        }

        /// <summary>
        /// Gets the archive for the category with the specified id.
        /// </summary>
        /// <param name="id">The category id</param>
        /// <param name="year">The optional year</param>
        /// <param name="month">The optional month</param>
        /// <param name="page">The optional page</param>
        /// <param name="category">The optional category id</param>
        [HttpGet("archive")]
        public IActionResult Archive(Guid id, int? year = null, int? month = null, int? page = null, Guid? category = null, Guid? tag = null)
        {
            Models.BlogArchive model;

            if (category.HasValue)
            {
                model = api.Archives.GetByCategoryId<Models.BlogArchive>(id, category.Value, page, year, month);
                model.Id = category.Value;
            }
            else if (tag.HasValue)
            {
                model = api.Archives.GetByTagId<Models.BlogArchive>(id, tag.Value, page, year, month);
                model.Id = tag.Value;
            }
            else model = api.Archives.GetById<Models.BlogArchive>(id, page, year, month);

            var json = JsonConvert.SerializeObject(model, serializerSettings);
            return new OkObjectResult(json);
        }


        /// <summary>
        /// Gets the page with the specified id.
        /// </summary>
        /// <param name="id">The unique id</param>
        [HttpGet("page")]
        public IActionResult Page(Guid id)
        {
            var model = api.Pages.GetById<Models.StandardPage>(id);

            var json = JsonConvert.SerializeObject(model, serializerSettings);
            return new OkObjectResult(json);
        }

        /// <summary>
        /// Gets the post with the specified id.
        /// </summary>
        /// <param name="id">The unique id</param>
        [HttpGet("post")]
        public IActionResult Post(Guid id)
        {
            var model = api.Posts.GetById<Models.BlogPost>(id);

            var json = JsonConvert.SerializeObject(model, serializerSettings);
            return new OkObjectResult(json);
        }

        /// <summary>
        /// Gets the TeaserPage with the specified id.
        /// </summary>
        /// <param name="id">The unique id</param>
        [HttpGet("startpage")]
        public IActionResult StartPage(Guid id)
        {
            var model = api.Pages.GetById<Models.StartPage>(id);

            var json = JsonConvert.SerializeObject(model, serializerSettings);
            return new OkObjectResult(json);
        }
    }
}
