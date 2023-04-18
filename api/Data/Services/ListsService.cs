using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace api.Data
{
    public class ListsService
    {
        private readonly IMongoCollection<Lists> _lists;

        public ListsService(IOptions<DatabaseSettings> options)
        {
            var mongoClient = new MongoClient(options.Value.ConnectionString);

            _lists = mongoClient.GetDatabase(options.Value.DatabaseName)
                .GetCollection<Lists>(options.Value.ListsCollectionName);
        }
        public async Task<List<Lists>> GetAsync(string userId)
        {
            return await _lists.Find(l => l._userId == userId).ToListAsync();
        }

        public async Task<Lists> GetOneAsync(string id)
        {
            return await _lists.Find(l => l.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(Lists newList)
        {
            await _lists.InsertOneAsync(newList);
            return;
        }

        public async Task UpdateAsync(string id, Lists updatedList)
        {
            await _lists.ReplaceOneAsync(l => l.Id == id, updatedList);
            return;
        }

        public async Task RemoveAsync(string id)
        {
            await _lists.DeleteOneAsync(t => t.Id == id);
            return;
        }
    }
}

