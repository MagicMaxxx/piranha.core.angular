using Piranha.AttributeBuilder;
using Piranha.Models;
using Piranha.Extend.Fields;

namespace Angular.Models
{
    /// <summary>
    /// Basic post with main content in markdown.
    /// </summary>
    [PostType(Title = "BlogPost")]
    public class BlogPost : Post<BlogPost>
    {
        /// <summary>
        /// Gets/sets the heading.
        /// </summary>
        [Region()]
        public Regions.Heading Heading { get; set; }        
    }
}
