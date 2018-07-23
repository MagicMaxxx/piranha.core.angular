using Piranha.Extend;
using Piranha.Extend.Blocks;
using Piranha.Extend.Fields;

namespace Angular.Models.Blocks
{
    [BlockType(Name = "Slider Item", Category = "Content", Icon = "far fa-newspaper", IsUnlisted = true)]
    public class SliderItem : Block
    {
        public StringField Body { get; set; }
    }

    /// <summary>
    /// Simple region for some optional page heading information.
    /// </summary>
    [BlockGroupType(Name = "Slider", Category = "Groups", Icon = "far fa-newspaper", UseCustomView = true)]
    [BlockItemType(Type = typeof(HtmlBlock))]
    [BlockItemType(Type = typeof(HtmlColumnBlock))]
    [BlockItemType(Type = typeof(SliderItem))]

    public class SliderGroup : BlockGroup
    {
        public StringField MainTitle { get; set; }
    }
}
