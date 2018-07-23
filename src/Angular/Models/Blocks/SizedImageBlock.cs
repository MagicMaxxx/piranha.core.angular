using Angular.Models.Fields;
using Piranha.Extend;
using Piranha.Extend.Fields;

namespace Angular.Models.Blocks
{
    /// <summary>
    /// Image block.
    /// </summary>
    [BlockType(Name = "SizedImage", Category = "Media", Icon = "fas fa-image")]
    public class SizedImageBlock : Block
    {
        /// <summary>
        /// Gets/sets the image body.
        /// </summary>
        public SizedImageField Body { get; set; }
    }
}
