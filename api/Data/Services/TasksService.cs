using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace api.Data
{
    public class TasksService
    {
        private readonly IMongoCollection<Tasks> _tasks;

        public TasksService(IOptions<DatabaseSettings> options)
        {
            var mongoClient = new MongoClient(options.Value.ConnectionString);

            _tasks = mongoClient.GetDatabase(options.Value.DatabaseName)
                .GetCollection<Tasks>(options.Value.TasksCollectionName);
        }

        public async Task<List<Tasks>> GetAsync(string listId)
        {
            return await _tasks.Find(t => t.ListId == listId).ToListAsync();
        }

        public async Task<Tasks> GetOneAsync(string id)
        {
            return await _tasks.Find(t => t.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(Tasks newTask)
        {
            await _tasks.InsertOneAsync(newTask);
            return;
        }

        public async Task UpdateAsync(string id, Tasks updatedTask)
        {
            await _tasks.ReplaceOneAsync(t => t.Id == id, updatedTask);
            return;
        }

        public async Task RemoveAsync(string id)
        {
            await _tasks.DeleteOneAsync(t => t.Id == id);
            return;
        }

        public async Task RemoveAllTasksByListAsync(string listId)
        {
            await _tasks.DeleteManyAsync(t => t.ListId == listId);
            return;
        }
    }
}

