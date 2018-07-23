using Piranha.AttributeBuilder;
using Piranha.Models;
using Piranha.Extend.Fields;
using System.Collections.Generic;

namespace Angular.Models
{
    [PageType(Title = "Start page")]
    [PageTypeRoute(Title = "Default", Route = "/start")]
    public class StartPage : Page<StartPage>
    {
        /// <summary>
        /// Gets/sets the page heading.
        /// </summary>
        [Region]
        public Regions.Heading Heading { get; set; }

        /// <summary>
        /// Gets/sets the available teasers.
        /// </summary>
        [Region(ListTitle = "Title")]
        public IList<Regions.Teaser> Teasers { get; set; }

        /// <summary>
        /// Default constructor.
        /// </summary>
        public StartPage()
        {
            Teasers = new List<Regions.Teaser>();
        }
    }
}
