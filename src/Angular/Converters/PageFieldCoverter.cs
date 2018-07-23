using System;
using Angular.Models.Fields;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Piranha;
using Piranha.Extend.Fields;

namespace Angular.Converters
{
    public class PageFieldCoverter : JsonConverter
    {
        public PageFieldCoverter() { }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            var field = (PageField)value;

            JObject jo = new JObject();

            jo.Add(new JProperty("HasValue", field.HasValue));
            jo.Add(new JProperty("Permalink", field.HasValue ? field.Page.Permalink : null));

            jo.WriteTo(writer);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

        public override bool CanConvert(Type objectType)
        {
            return typeof(PageField).IsAssignableFrom(objectType);
        }
    }
}
