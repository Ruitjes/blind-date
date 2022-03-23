using System;
namespace feed_service.Interfaces
{
	public interface IMongoDbSettings
	{
		string ConnectionString { get; }

		string DbName { get; }

		string QuestionCollectionName { get; }

		string BookmarkCollectionName { get; }
	}
}

