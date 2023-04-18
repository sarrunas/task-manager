namespace api.Data
{
    public class DatabaseSettings
    {
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
        public string ListsCollectionName { get; set; } = string.Empty;
        public string TasksCollectionName { get; set; } = string.Empty;

    }
}