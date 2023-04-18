using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace api.Data
{
    public class Lists
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [Required]
        public string Title { get; set;} = string.Empty;
        
        public string _userId { get; set; } = string.Empty;
        
    }

}