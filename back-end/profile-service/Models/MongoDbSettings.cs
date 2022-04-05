using System;
using profile_service.Interfaces;

namespace profile_service.Models
{
    public class MongoDbSettings : IMongoDbSettings
    {
        public string ConnectionString { get; }
        public string DbName { get; }
        public string ProfileCollectionName { get; }

        public MongoDbSettings(string? connectionString, string? dbName, string? profileCollectionName)
        {
            if (connectionString == null || dbName == null || profileCollectionName == null)
            {
                throw new Exception("Database environment variables not set.");
            }
            else
            {
                ConnectionString = connectionString;
                DbName = dbName;
                ProfileCollectionName = profileCollectionName;
            }
        }
    }
}
