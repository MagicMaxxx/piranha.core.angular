using Piranha.AttributeBuilder;
using Piranha.Models;

namespace Angular.Models
{
    /// <summary>
    /// Basic blog page.
    /// </summary>
    [PageType(Title = "Blog Archive", UseBlocks = false)]
    public class BlogArchive : ArchivePage<BlogArchive>
    {
        /// <summary>
        /// Gets/sets the archive heading.
        /// </summary>
        [Region]
        public Regions.Heading Heading { get; set; }
    }
}
