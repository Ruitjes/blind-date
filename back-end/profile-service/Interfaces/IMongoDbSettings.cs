using System;
namespace profile_service.Interfaces
{
	public interface IMongoDbSettings
	{
		string ConnectionString { get; }

		string DbName { get; }

		string ProfileCollectionName { get; }
	}
}
