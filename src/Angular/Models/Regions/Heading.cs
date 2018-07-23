using Angular.Models.Fields;
using Piranha.AttributeBuilder;
using Piranha.Extend.Fields;

namespace Angular.Models.Regions
{
    /// <summary>
    /// Simple region for some optional page heading information.
    /// </summary>
    public class Heading
    {
        /// <summary>
        /// Gets/sets the optional primary image.
        /// </summary>
        [Field(Title = "Primary Image")]
        public SizedImageField PrimaryImage { get; set; }



        /// <summary>
        /// Gets/sets the optional ingress.
        /// </summary>
        [Field]
        public TextField Ingress { get; set; }
    }
}
