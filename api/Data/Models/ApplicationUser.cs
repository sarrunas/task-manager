using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace api.Data
{
    [CollectionName("users")]
    public class ApplicationUser : MongoIdentityUser<Guid>
    {
       public string Username { get; set; } = string.Empty;
    }

}