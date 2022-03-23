using System;
using feed_service.Interfaces;

namespace feed_service.Models
{
    public class MongoDbSettings : IMongoDbSettings
    {
        public string ConnectionString { get; }
        public string DbName { get; }
        public string QuestionCollectionName { get; }
        public string BookmarkCollectionName { get; }

        public MongoDbSettings(string? connectionString, string? dbName, string? questionCollectionName, string? bookmarkCollectionName)
        {
            if (connectionString == null || dbName == null || questionCollectionName == null || bookmarkCollectionName == null)
            {
                throw new Exception("Database environment variables not set.");
            }
            else
            {
                ConnectionString = connectionString;
                DbName = dbName;
                QuestionCollectionName = questionCollectionName;
                BookmarkCollectionName = bookmarkCollectionName;
            }
        }
    }
}
